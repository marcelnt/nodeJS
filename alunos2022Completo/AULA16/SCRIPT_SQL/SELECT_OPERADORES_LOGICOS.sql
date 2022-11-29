#Estrutura básica do SELECT

#Retorna todas as colunas (*) e todos os registros
select * from tbl_filme;
select tbl_filme.* from tbl_filme;

#Retorna apenas os atributos selecionados de todos os registros
select nome, duracao, data_lancamento from tbl_filme;
select tbl_filme.nome, tbl_filme.duracao, tbl_filme.data_lancamento
	from tbl_filme;
    
#Filtro pelo ID
select * from tbl_filme where id = 3;
select nome, sinopse from tbl_filme where id = 3;

#Filtro por outros atributos
# Retorna apenas os filmes com a mesma escrita
select * from tbl_filme
	where nome = 'Batman';
    
# Retorna apenas os filmes com a mesma escrita
select * from tbl_filme
	where nome like 'Batman';

#Retorna os filmes que terminam com a palavra chave (batman)
select * from tbl_filme
	where nome like '%Batman';

#Retorna os filmes que iniciam com a palavra chave (batman)
select * from tbl_filme
	where nome like 'Batman%';

#Retorna os filmes que tenham  a palavra chave (batman) em qualquer parte da escrita
select * from tbl_filme
	where nome like '%Batman%';
    
select * from tbl_filme
	where nome like 'O%';
    
#Ordenacao 
select * from tbl_filme order by nome;  #Odenacao Crescente
select * from tbl_filme order by nome asc;  #Odenacao Crescente
select * from tbl_filme order by nome desc; #Ordenacao Decrescente

select * from tbl_filme order by nome, nome_original desc; 
select * from tbl_filme order by nome asc, nome_original desc; 
#Operadores de Comparaçao
	# =
	# <
	# >
	# <=
	# >=
	# <>
select * from tbl_filme where data_lancamento < '2010-12-31';
select * from tbl_filme where data_lancamento > '1990-12-31';
select * from tbl_filme where data_lancamento <= '1990-12-31';
select * from tbl_filme where data_lancamento >= '1990-12-31';
select * from tbl_filme where data_lancamento <> '2000-03-03';
select * from tbl_filme where data_lancamento = '2000-03-03';

#Operadores Lógicos
	#E - AND
	#OU - OR
    #NAO - NOT
#Ordem de execuçao dos operadores lógicos
	#Prioridade 0 - ()
	#Prioridade 1 - NOT
	#Prioridade 2 - AND
	#Prioridade 3 - OR
    
#OR    
select * from tbl_filme	
	where nome like 'a%' or data_lancamento < '2010-01-01';
    
select * from tbl_filme	
	where nome like 'a%' or nome like 'o%';

    
#AND
select * from tbl_filme	
	where nome like 'a%' and data_lancamento < '2010-01-01';
    
select nome, nome_original, sinopse, duracao, data_lancamento
from tbl_filme
where (((nome like 'a%' or nome_original like 'a%') or
	  (nome like 'o%' or nome_original like 'o%')) and
      data_lancamento < '2010-01-01');
      
select * from tbl_filme;
