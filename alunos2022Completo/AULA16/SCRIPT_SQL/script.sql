#Comentário

#Permite visualizar todos os databases existentes no BD
show databases;

#Permite apagar um databse e toda a sua estrutura de tabelas e dados
drop database dbcontatos20222;

#Permite criar um novo database no BD
create database db_lion_school;

#Permite ativar a utilizacao de um database
use db_lion_school;

#Permite visulizar todas as tabelas existentes dentro de um database
show tables;

create table tbl_aluno (
	id int UNSIGNED  not null auto_increment primary key,
    nome varchar(80) not null,
    foto varchar(100) not null,
    sexo varchar(1),
    rg varchar (15) not null,
    cpf varchar(18) not null,
    email varchar(256) not null,
    telefone varchar(18),
    celular varchar(18),
    data_nascimento date not null,
    unique index(id)
);

#Permite apagar uma tabela
drop table tbl_aluno;

create table tbl_curso(
	id int unsigned not null auto_increment primary key,
    nome varchar(50) not null,
    carga_horaria int not null,
    icone varchar(100),
    sigla varchar(6),
	unique index (id)
);

create table tbl_aluno_curso (
	id int unsigned not null auto_increment primary key,
    id_aluno int unsigned not null,
    id_curso int unsigned not null,
    matricula varchar (15) not null,
    status_aluno varchar (10) not null, 
    
    #Programacao para definir uma chave estrangeira
    foreign key (id_aluno) #Define quel o atributo será uma FK
		references tbl_aluno (id), # Define de onde virá a PK
	foreign key (id_curso) #Define quel o atributo será uma FK
		references tbl_curso (id),# Define de onde virá a PK
	unique index (id)
);

# Permite visualizar todos os dados de todas as colunas de uma tabela
select * from tbl_aluno;

# Permite inserir dados dentro de uma tabela
insert into tbl_aluno (nome, 
					   foto, 
                       sexo, 
                       rg, 
                       cpf, 
                       email, 
                       telefone, 
                       celular, 
                       data_nascimento)
	values 			   ('José da Silva', 
						'https://cdn-icons-png.flaticon.com/512/1373/1373255.png', 
                        'M', 
                        '34.456.666-1',
                        '300.567.456-23',
                        'jose@gmail.com',
                        '011 4556-7777',
                        '011 9 9765-6660',
                        '2000-04-10'
						);

insert into tbl_aluno (nome, 
					   foto, 
                       sexo, 
                       rg, 
                       cpf, 
                       email, 
                       telefone, 
                       celular, 
                       data_nascimento)
	values 			   ('Maria da Silva', 
						'https://icones.pro/wp-content/uploads/2021/03/avatar-de-personne-icone-femme.png', 
                        'F', 
                        '23.988.98-1',
                        '304.567.345-09',
                        'maria@gmail.com',
                        '011 4678-7666',
                        '011 9 8709-0988',
                        '1990-10-10'
						);
                        
#Permite alterar um valor de um atributo da tabela
	#Obs: sempre devemos especificar qual será o registro que vai sofrer a alteraçao
       # gerealmente sempre será a PK
update tbl_aluno set rg = '35.567.23-4' where id = 1;

#Permite apagar um registro de uma tabela do BD
#Obs: sempre devemos especificar qual será o registro que vai sofrer a exclusao
       # gerealmente sempre será a PK
delete from tbl_aluno where id = 1;

select * from tbl_aluno;



