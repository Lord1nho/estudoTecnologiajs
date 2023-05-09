CREATE SCHEMA loja;

CREATE DOMAIN loja.tipo_login AS VARCHAR(20);

CREATE TYPE loja.tipos_itens AS ENUM ('arma', 'escudo', 'pet','skin');
CREATE TYPE loja.tipos_arma AS ENUM ('espada', 'machado');
CREATE TYPE loja.tipos_escudo AS ENUM ('oval', 'ingles');
CREATE TYPE loja.tipos_pets AS ENUM ('lobo', 'corvo', 'dragao');
CREATE TYPE loja.tipos_operacoes AS ENUM ('criar', 'atualizar', 'deletar');
CREATE TYPE loja.tipos_status AS ENUM ('aberto', 'cancelado', 'finalizado');
CREATE TYPE loja.tipos_status_inventario AS ENUM ('ativo', 'inativo');
CREATE TYPE loja.tipos_cartao AS ENUM ('credito', 'debito');
CREATE TYPE loja.tipos_pagamento AS ENUM ('cartao', 'pix', 'saldo');
CREATE TYPE loja.tipos_status_pagamento AS ENUM ('concluido', 'processando', 'falha');


CREATE TABLE loja.usuario(
  login loja.tipo_login PRIMARY KEY,
  primeiro_nome VARCHAR(15) NOT NULL,
  sobrenome VARCHAR(15) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  senha VARCHAR(30) NOT NULL,
  data_nascimento DATE NOT NULL,
  telefone VARCHAR[] NOT NULL
);


CREATE TABLE loja.administrador(
  id_admin SERIAL PRIMARY KEY,
  login loja.tipo_login NOT NULL,
  CONSTRAINT fk_usuario FOREIGN KEY (login) REFERENCES loja.usuario(login) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.jogador(
  id_jogador SERIAL PRIMARY KEY,
  login loja.tipo_login NOT NULL,
  CONSTRAINT fk_usuario FOREIGN KEY (login) REFERENCES loja.usuario(login) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.item(  
  id_item SERIAL PRIMARY KEY,
  id_jogador INT NOT NULL,
  nome VARCHAR(30) NOT NULL,
  valor REAL NOT NULL,
  CONSTRAINT ck_valor CHECK (valor >= 0),
  CONSTRAINT fk_jogador FOREIGN KEY (id_jogador) REFERENCES loja.jogador(id_jogador) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.arma(
  id_item INT PRIMARY KEY,
  dano INT NOT NULL,
  tipo_arma loja.tipos_arma NOT NULL,
  CONSTRAINT fk_item FOREIGN KEY (id_item) REFERENCES loja.item(id_item) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.escudo(
  id_item INT PRIMARY KEY,
  defesa INT NOT NULL,
  tipo_escudo loja.tipos_escudo NOT NULL,
  CONSTRAINT fk_item FOREIGN KEY (id_item) REFERENCES loja.item(id_item) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.skin(
  id_item INT PRIMARY KEY,
  cor VARCHAR(30) NOT NULL,
  tipo_skin loja.tipos_itens NOT NULL,
  CONSTRAINT fk_item FOREIGN KEY (id_item) REFERENCES loja.item(id_item) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.pet(
  id_item INT PRIMARY KEY,
  tipo_pet loja.tipos_pets NOT NULL,
  CONSTRAINT fk_item FOREIGN KEY (id_item) REFERENCES loja.item(id_item) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.carteira(
  login loja.tipo_login PRIMARY KEY,
  saldo REAL DEFAULT 0 NOT NULL,
  CONSTRAINT fk_usuario FOREIGN KEY(login) REFERENCES loja.usuario(login) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.administrador_maintain_item(
  id_operacao SERIAL PRIMARY KEY,
  id_administrador INT NOT NULL,
  id_item INT NOT NULL,
  tipo_operacao loja.tipos_operacoes  NOT NULL,
  dia DATE NOT NULL,
  CONSTRAINT fk_admin FOREIGN KEY(id_administrador) REFERENCES loja.administrador(id_admin) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_item FOREIGN KEY(id_item) REFERENCES loja.item(id_item) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE loja.carrinho(
  id_carrinho SERIAL PRIMARY KEY,
  id_item INT NOT NULL,
  qtd_itens INT NOT NULL,
  valor REAL NOT NULL,
  login loja.tipo_login,
  status loja.tipos_status NOT NULL,
  CONSTRAINT fk_item FOREIGN KEY(id_item) REFERENCES loja.item(id_item) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_usuario FOREIGN KEY(login) REFERENCES loja.usuario(login) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT ck_qtd CHECK (qtd_itens >= 0)
);


CREATE TABLE loja.inventario(
  id_inventario SERIAL PRIMARY KEY,
  id_item INT NOT NULL,
  id_carrinho INT NOT NULL,
  login loja.tipo_login NOT NULL,
  status loja.tipos_status_inventario NOT NULL,
  CONSTRAINT fk_usuario FOREIGN KEY(login) REFERENCES loja.usuario(login) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_item FOREIGN KEY(id_item) REFERENCES loja.item(id_item) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_carrinho FOREIGN KEY(id_carrinho) REFERENCES loja.carrinho(id_carrinho) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE loja.cartao(
  id_cartao SERIAL PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  numero VARCHAR(16) NOT NULL,
  cvv VARCHAR(3) NOT NULL,
  validade DATE NOT NULL,
  tipo_cartao loja.tipos_cartao NOT NULL
);


CREATE TABLE loja.pagamento(
  id_pagamento SERIAL PRIMARY KEY,
  dia DATE NOT NULL,
  valor REAL NOT NULL,
  id_carrinho INT NOT NULL,
  tipo_pagamento loja.tipos_pagamento NOT NULL,
  status loja.tipos_status_pagamento NOT NULL,
  id_cartao INT,
  CONSTRAINT fk_carrinho FOREIGN KEY(id_carrinho) REFERENCES loja.carrinho(id_carrinho) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cartao FOREIGN KEY(id_cartao) REFERENCES loja.cartao(id_cartao) ON DELETE CASCADE ON UPDATE CASCADE
);


