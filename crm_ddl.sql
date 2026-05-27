-- =============================================================
-- CRM ETL - DDL PostgreSQL
-- Grupo RIC - Equipe de Inteligência Comercial
-- Gerado em: 2026-05-14
-- =============================================================

-- -------------------------------------------------------------
-- SCHEMA
-- -------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS crm;

-- =============================================================
-- TABELAS DIMENSIONAIS
-- (dados de referência, mudam pouco, sem start/end obrigatório)
-- =============================================================

-- -------------------------------------------------------------
-- users: executivos e usuários do CRM
-- Fonte: /api/v2/users + Google Sheets (equipe_id)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.users (
    user_id             INTEGER         PRIMARY KEY,
    login               VARCHAR(255),
    name                VARCHAR(255),
    lastname            VARCHAR(255),
    cpf                 VARCHAR(14),
    whatsapp            VARCHAR(20),
    is_sales_executive  BOOLEAN         DEFAULT FALSE,
    is_announcer        BOOLEAN         DEFAULT FALSE,
    is_active           BOOLEAN         DEFAULT TRUE,
    is_deleted          BOOLEAN         DEFAULT FALSE,
    equipe_id           INTEGER,                        -- vem do Google Sheets
    register_date       TIMESTAMPTZ,
    last_update_date    TIMESTAMPTZ,
    etl_updated_at      TIMESTAMPTZ     DEFAULT NOW()   -- controle incremental
);

COMMENT ON TABLE crm.users IS 'Usuários do CRM enriquecidos com equipe_id do Google Sheets';
COMMENT ON COLUMN crm.users.equipe_id IS 'ID da equipe mapeado via Google Sheets, NULL = sem equipe';
COMMENT ON COLUMN crm.users.etl_updated_at IS 'Timestamp da última carga do ETL nesta linha';

-- -------------------------------------------------------------
-- entities: clientes (organizações e pessoas físicas)
-- Fonte: /api/v2/entities e /api/v2/entities/organizations
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.entities (
    entity_id               INTEGER         PRIMARY KEY,
    name                    VARCHAR(500),
    corporate_name          VARCHAR(500),
    cnpj                    VARCHAR(18),
    cpf                     VARCHAR(14),
    state_registration      VARCHAR(100),
    municipal_registration  VARCHAR(100),
    is_agency               BOOLEAN         DEFAULT FALSE,
    notes                   TEXT,
    company_id              INTEGER,
    register_date           TIMESTAMPTZ,
    last_update_date        TIMESTAMPTZ,
    is_deleted              BOOLEAN         DEFAULT FALSE,
    etl_updated_at          TIMESTAMPTZ     DEFAULT NOW()
);

COMMENT ON TABLE crm.entities IS 'Clientes: organizações e pessoas físicas';
COMMENT ON COLUMN crm.entities.is_agency IS 'TRUE = agência, FALSE = anunciante direto';

-- -------------------------------------------------------------
-- products: produtos/aproveitamentos disponíveis no CRM
-- Fonte: /api/v2/products
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.products (
    product_id                              INTEGER     PRIMARY KEY,
    name                                    VARCHAR(500),
    notes                                   TEXT,
    value                                   NUMERIC(15,2),
    is_active                               BOOLEAN     DEFAULT TRUE,
    is_deleted                              BOOLEAN     DEFAULT FALSE,
    is_control_quotas                       BOOLEAN,
    is_control_balance                      BOOLEAN,
    is_automatic_distributed_scheduling    BOOLEAN,
    is_informative_value                    BOOLEAN,
    is_available_on_emidia_portal          BOOLEAN,
    start_date                              DATE,
    end_date                                DATE,
    company_id                              INTEGER,
    company_group_id                        INTEGER,
    external_code                           VARCHAR(100),
    origin                                  VARCHAR(100),
    register_date                           TIMESTAMPTZ,
    last_update_date                        TIMESTAMPTZ,
    etl_updated_at                          TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE crm.products IS 'Tabela dimensional de produtos — cruzar com proposal_items no Power BI';

-- =============================================================
-- TABELAS FATO
-- (dados transacionais, alta frequência de atualização)
-- =============================================================

-- -------------------------------------------------------------
-- deals: negócios (oportunidades comerciais)
-- Fonte: /api/v2/deals
-- Tabela central do CRM
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.deals (
    deal_id                     INTEGER         PRIMARY KEY,
    description                 TEXT,
    user_id                     INTEGER         REFERENCES crm.users(user_id),
    entity_id                   INTEGER         REFERENCES crm.entities(entity_id),
    pipeline_id                 INTEGER,
    pipeline_step_id            INTEGER,
    negotiated_value            NUMERIC(15,2),
    net_value                   NUMERIC(15,2),
    agency_commission_pct       NUMERIC(5,2),
    is_won                      BOOLEAN         DEFAULT FALSE,
    is_lost                     BOOLEAN         DEFAULT FALSE,
    is_pending                  BOOLEAN         DEFAULT TRUE,
    is_deleted                  BOOLEAN         DEFAULT FALSE,
    is_advanced_product         BOOLEAN         DEFAULT FALSE,
    win_date                    TIMESTAMPTZ,
    lose_date                   TIMESTAMPTZ,
    approval_date               TIMESTAMPTZ,
    forecast_sales_date         DATE,
    start_date                  DATE,
    end_date                    DATE,
    conclusion_date             DATE,
    conversion_date             TIMESTAMPTZ,
    shelve_date                 TIMESTAMPTZ,
    activities_quantity         INTEGER         DEFAULT 0,
    sequence_order              INTEGER,
    register_date               TIMESTAMPTZ,
    last_update_date            TIMESTAMPTZ,
    etl_updated_at              TIMESTAMPTZ     DEFAULT NOW()
);

COMMENT ON TABLE crm.deals IS 'Negócios/oportunidades — tabela central';
COMMENT ON COLUMN crm.deals.net_value IS 'Valor líquido do negócio (após comissão)';
COMMENT ON COLUMN crm.deals.agency_commission_pct IS 'Percentual de comissão de agência';

-- -------------------------------------------------------------
-- dues: lançamentos / parcelas ("basket")
-- Fonte: /api/v2/deals/dues
-- Cada negócio pode ter N parcelas (1 ou mais)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.dues (
    due_id                  INTEGER         PRIMARY KEY,
    deal_id                 INTEGER         REFERENCES crm.deals(deal_id),
    user_id                 INTEGER         REFERENCES crm.users(user_id),
    product_id              INTEGER         REFERENCES crm.products(product_id),
    deal_proposal_item_id   INTEGER,
    value                   NUMERIC(15,2),
    net_value               NUMERIC(15,2),
    due_date                DATE,
    payment_date            DATE,
    register_date           TIMESTAMPTZ,
    last_update_date        TIMESTAMPTZ,
    etl_updated_at          TIMESTAMPTZ     DEFAULT NOW()
);

COMMENT ON TABLE crm.dues IS 'Lançamentos/parcelas dos negócios — o "basket" que vai cair por data';
COMMENT ON COLUMN crm.dues.due_date IS 'Data prevista de recebimento';
COMMENT ON COLUMN crm.dues.payment_date IS 'Data real de pagamento (NULL = não pago ainda)';

-- -------------------------------------------------------------
-- activities: atividades dos executivos
-- Fonte: /api/v2/activity
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.activities (
    activity_id         INTEGER         PRIMARY KEY,
    deal_id             INTEGER         REFERENCES crm.deals(deal_id),
    user_id             INTEGER         REFERENCES crm.users(user_id),
    entity_id           INTEGER         REFERENCES crm.entities(entity_id),
    activity_type_id    INTEGER,
    activity_type_desc  VARCHAR(255),
    title               VARCHAR(500),
    notes               TEXT,
    is_done             BOOLEAN         DEFAULT FALSE,
    is_all_day          BOOLEAN         DEFAULT FALSE,
    done_date           TIMESTAMPTZ,
    start_date          TIMESTAMPTZ,
    end_date            TIMESTAMPTZ,
    register_date       TIMESTAMPTZ,
    etl_updated_at      TIMESTAMPTZ     DEFAULT NOW()
);

COMMENT ON TABLE crm.activities IS 'Atividades dos executivos — quantidade, tipo, equipe, etc.';
COMMENT ON COLUMN crm.activities.activity_type_desc IS 'Descrição desnormalizada do tipo (evita join extra)';

-- -------------------------------------------------------------
-- proposals: propostas comerciais por negócio
-- Fonte: /api/v2/deals/proposals
-- Cada negócio pode ter N versões de proposta
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.proposals (
    proposal_id                 INTEGER         PRIMARY KEY,
    deal_id                     INTEGER         REFERENCES crm.deals(deal_id),
    title                       VARCHAR(500),
    version                     INTEGER         DEFAULT 1,
    table_value                 NUMERIC(15,2),
    net_value                   NUMERIC(15,2),
    negotiated_value            NUMERIC(15,2),
    avg_discount_pct            NUMERIC(5,2),
    discount_pct                NUMERIC(5,2),
    is_active                   BOOLEAN         DEFAULT TRUE,
    is_approved                 BOOLEAN         DEFAULT FALSE,
    is_rejected                 BOOLEAN         DEFAULT FALSE,
    is_approval_requested       BOOLEAN         DEFAULT FALSE,
    sent_to                     VARCHAR(255),
    sent_date                   TIMESTAMPTZ,
    approval_date               TIMESTAMPTZ,
    rejection_date              TIMESTAMPTZ,
    rejection_reason            TEXT,
    notes                       TEXT,
    description                 TEXT,
    register_date               TIMESTAMPTZ,
    last_update_date            TIMESTAMPTZ,
    etl_updated_at              TIMESTAMPTZ     DEFAULT NOW()
);

COMMENT ON TABLE crm.proposals IS 'Propostas comerciais vinculadas aos negócios';

-- -------------------------------------------------------------
-- proposal_items: itens de proposta
-- Fonte: nested dentro de /api/v2/deals/proposals
-- TABELA MAIS IMPORTANTE para análise por veículo/produto
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.proposal_items (
    item_id             INTEGER         PRIMARY KEY,
    proposal_id         INTEGER         REFERENCES crm.proposals(proposal_id),
    deal_id             INTEGER         REFERENCES crm.deals(deal_id),
    product_id          INTEGER         REFERENCES crm.products(product_id),
    channel_id          INTEGER,                        -- veículo: Jovem PAN, RICTV, etc.
    channel_name        VARCHAR(255),                   -- desnormalizado para facilitar Power BI
    unit_value          NUMERIC(15,2),
    total_value         NUMERIC(15,2),
    discount            NUMERIC(5,2),
    marketing_discount  NUMERIC(5,2),
    negotiated_value    NUMERIC(15,2),
    quantity            NUMERIC(10,3),
    distribution_type   VARCHAR(100),
    register_date       TIMESTAMPTZ,
    last_update_date    TIMESTAMPTZ,
    etl_updated_at      TIMESTAMPTZ     DEFAULT NOW()
);

COMMENT ON TABLE crm.proposal_items IS 'Itens de proposta — análise por veículo (channel_id) e produto';
COMMENT ON COLUMN crm.proposal_items.channel_id IS 'ID do veículo: Jovem PAN, Jovem PAN NEWS, Banda B, RICTV, etc.';
COMMENT ON COLUMN crm.proposal_items.channel_name IS 'Nome desnormalizado — evita join no Power BI';

-- -------------------------------------------------------------
-- deal_step_logs: histórico de movimentação nos funis
-- Fonte: /api/v2/deals/steps/logs
-- Usado para KPI de etapa (ex: negócios que passaram por "Apresentação")
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS crm.deal_step_logs (
    log_id              INTEGER         PRIMARY KEY,
    deal_id             INTEGER         REFERENCES crm.deals(deal_id),
    pipeline_id         INTEGER,
    pipeline_step_id    INTEGER,
    user_id             INTEGER         REFERENCES crm.users(user_id),
    company_id          INTEGER,
    value               NUMERIC(15,2),
    enter_date          DATE,
    etl_updated_at      TIMESTAMPTZ     DEFAULT NOW()
);

COMMENT ON TABLE crm.deal_step_logs IS 'Log de movimentação entre etapas do funil — KPI de apresentações, etc.';

-- =============================================================
-- ÍNDICES
-- Prioridade: colunas usadas em filtros e JOINs frequentes
-- =============================================================

-- deals
CREATE INDEX IF NOT EXISTS idx_deals_user_id         ON crm.deals(user_id);
CREATE INDEX IF NOT EXISTS idx_deals_entity_id       ON crm.deals(entity_id);
CREATE INDEX IF NOT EXISTS idx_deals_register_date   ON crm.deals(register_date);
CREATE INDEX IF NOT EXISTS idx_deals_last_update      ON crm.deals(last_update_date);
CREATE INDEX IF NOT EXISTS idx_deals_is_won          ON crm.deals(is_won);
CREATE INDEX IF NOT EXISTS idx_deals_is_lost         ON crm.deals(is_lost);

-- dues
CREATE INDEX IF NOT EXISTS idx_dues_deal_id          ON crm.dues(deal_id);
CREATE INDEX IF NOT EXISTS idx_dues_due_date         ON crm.dues(due_date);
CREATE INDEX IF NOT EXISTS idx_dues_user_id          ON crm.dues(user_id);

-- activities
CREATE INDEX IF NOT EXISTS idx_activities_user_id    ON crm.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_deal_id    ON crm.activities(deal_id);
CREATE INDEX IF NOT EXISTS idx_activities_type       ON crm.activities(activity_type_id);
CREATE INDEX IF NOT EXISTS idx_activities_start      ON crm.activities(start_date);

-- proposal_items
CREATE INDEX IF NOT EXISTS idx_pitems_proposal_id    ON crm.proposal_items(proposal_id);
CREATE INDEX IF NOT EXISTS idx_pitems_channel_id     ON crm.proposal_items(channel_id);
CREATE INDEX IF NOT EXISTS idx_pitems_product_id     ON crm.proposal_items(product_id);
CREATE INDEX IF NOT EXISTS idx_pitems_deal_id        ON crm.proposal_items(deal_id);

-- deal_step_logs
CREATE INDEX IF NOT EXISTS idx_logs_deal_id          ON crm.deal_step_logs(deal_id);
CREATE INDEX IF NOT EXISTS idx_logs_pipeline_step    ON crm.deal_step_logs(pipeline_step_id);
CREATE INDEX IF NOT EXISTS idx_logs_enter_date       ON crm.deal_step_logs(enter_date);

-- users
CREATE INDEX IF NOT EXISTS idx_users_equipe_id       ON crm.users(equipe_id);

-- =============================================================
-- CONTROLE INCREMENTAL
-- Tabela para o ETL registrar qual foi o último timestamp lido
-- por endpoint — base para o filtro updatedAtStart/updatedAtEnd
-- =============================================================
CREATE TABLE IF NOT EXISTS crm.etl_control (
    endpoint            VARCHAR(100)    PRIMARY KEY,
    last_extracted_at   TIMESTAMPTZ,
    last_run_at         TIMESTAMPTZ     DEFAULT NOW(),
    rows_inserted       INTEGER         DEFAULT 0,
    rows_updated        INTEGER         DEFAULT 0,
    status              VARCHAR(20)     DEFAULT 'ok'   -- ok | error
);

COMMENT ON TABLE crm.etl_control IS 'Controle incremental: registra o último timestamp lido por endpoint';

INSERT INTO crm.etl_control (endpoint, last_extracted_at) VALUES
    ('deals',           NOW() - INTERVAL '90 days'),
    ('dues',            NOW() - INTERVAL '90 days'),
    ('activities',      NOW() - INTERVAL '90 days'),
    ('proposals',       NOW() - INTERVAL '90 days'),
    ('entities',        NOW() - INTERVAL '90 days'),
    ('products',        NOW() - INTERVAL '90 days'),
    ('deal_step_logs',  NOW() - INTERVAL '90 days'),
    ('users',           NOW() - INTERVAL '90 days')
ON CONFLICT (endpoint) DO NOTHING;
