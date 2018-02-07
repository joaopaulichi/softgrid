# Softgrid
Diretiva de grid para Angularjs com Bootstrap e Font Awesome.

# Instalação

bower install softgrid

bower install softgrid --save

**Importante**: Injetar modulo 'softgrid.directive' no projeto.

## Utilização

//HTML

`<softgrid cols="vm.colunas" actions="vm.acoes" data="vm.data"> </softgrid>`

// JAVASCRIPT

     function _gerarGrid() {

         vm.colunas = [
             {title: "Nome",     item: function(item){return item.nome}},
             {title: "Cargo",    item: function(item){return item.cargo}, align: "center"},
             {title: "Telefone", item: function(item){return item.contato.telefone}}
         ];

         vm.acoes = [
             {title: "Editar",   icon: "fa fa-info-circle", function: _teste},
             {title: "Excluir",  icon: "fa fa-wrench",      function: _teste},
             {title: "Bloquear", icon: "fa fa-calculator",  function: _teste}
         ];

         vm.data = [
                      {nome: "Jack", cargo: "Programador", contato: {tipo: "residencial", telefone: "12 90101-0202"}},
                      {nome: "Nunes", cargo: "Programador", contato: {tipo: "residencial", telefone: "12 90101-0303"}},
                      {nome: "Peixoto", cargo: "Programador", contato: {tipo: "residencial", telefone: "12 90101-0404"}}
                    ];
     }

     function _teste(item){
          alert(item);
     }

## Atributos

### cols

Define as colunas da grid.

`<softgrid cols="vm.colunas"> </softgrid>`

     vm.colunas = [
        {title: "Nome",     item: function(item){return item.nome}},
        {title: "Cargo",    item: function(item){return item.cargo}, align: "center"},
        {title: "Telefone", item: function(item){return item.contato.telefone}}
     ];
     
Propriedade | Função | Valores | Exemplo
------------ |--------|--------|--------
title | Define o header da coluna | string | "Nome do Usuário"
item| Define a propriedade do objeto que aparece na coluna | function | function(item){ return item.nome }
align| Alinhamento do texto na coluna | "left", "center", "right"| "center"
maxLength| Tamanho máximo de caracteres na coluna | int | 20
popOver| Mostra a coluna em um balão | boolean | true
     
 

### actions

Cria um botão de menu (hamburguer) em cada linha da grid contendo a ação desejada.

`<softgrid actions="vm.acoes"></softgrid>`

     vm.acoes = [
        {title: "Editar",   icon: "fa fa-info-circle", function: _editarUsuario},
        {title: "Excluir",  icon: "fa fa-wrench",      function: _excluirUsuario},
        {title: "Bloquear", icon: "fa fa-calculator",  function: _bloquearUsuario}
     ];

### data

Um array contendo os objetos que deverão ser carregados na grid.

`<softgrid data="vm.data"> </softgrid>`

     vm.data = [
                 {nome: "Jack", cargo: "Programador", contato: {tipo: "residencial", telefone: "12 90101-0202"}},
                 {nome: "Nunes", cargo: "Programador", contato: {tipo: "residencial", telefone: "12 90101-0303"}},
                 {nome: "Peixoto", cargo: "Programador", contato: {tipo: "residencial", telefone: "12 90101-0404"}}
               ];

### sg-controls

Botões CRUD:
     
     vm.controls.create =  { title: "Criar Novo", function: _funcaoCriar }; //title opcional
     vm.controls.read =    { function: _funcaoLer };
     vm.controls.update  = { function: _funcaoAtualizar };
     vm.controls.delete =  { title: "Deletar este item", function: _funcaoDeletar }; //title opcional
     
Controles fullscren:

     vm.controls.fullscreen = {on: "Mostrar filtros", off: "Esconder filtros", top: 60, zindex: 999}; //todos opcionais
     
Favorito (^v1.1.6):

     vm.controls.favorite = { title: "Favoritar", function: _editar, item: function(item){ return item.ativo }, width: 50 };
     
Selecionar Todos (^v1.1.9)

     vm.controls.select = {all: true, item: "ativo", callback: _teste};
     
Progresso (^v1.2.3)
     
     vm.controls.progress = { item: function (item) { return item.progresso ;}, title: "Conclusão", class: function (item){ return 'progress-bar-success'}};
     
Checkbox (^v1.2.6)

     vm.controls.checkBox = {
                function: _teste,
                item: "ativo"
            };
            
Aprovação (^v1.3.0)
     
     vm.controls.approve = { show: _showApprove, callback: _callBackApprove };
     
     function _callBackApprove(item, aprovado)
        {
            console.log(item + "|" + aprovado);
        }

        function _showApprove(item){
            return item.progresso > 50;
        }
        
Dados Filtrados (v1.3.5)

     vm.controls.filtered = [];
     
     //basta inicializar este objeto para diretiva retornar os dados que estao filtrados na grid
            
### width

Define um tamanho fixo de largura para a grid.

`<softgrid cols="vm.colunas" actions="vm.acoes" data="vm.data" width="1000"> </softgrid>`

### hide

Um objeto passado como atributo da diretiva informando os controles que deverão ser escondidos.

`<softgrid cols="vm.colunas" actions="vm.acoes" data="vm.data" hide="vm.esconder"> </softgrid>`

Controles para Esconder |
------------ |
filter |
options|
pagination|
     
     
     
     //Esconder os controles um por um:
     vm.esconder = {filter: true};
     
     //Esconder todos os controles:
     vm.esconder = {all: true};
     


### template

Define uma classe CSS customizada para a grid.

### subgrid

Define uma sub-grid em cada linha da grid para mostrar objetos-filhos de algum item do array.

       vm.subgrid = {};
                 vm.subgrid.item = function (item) { return item.sub };

                 vm.subgrid.cols = [
                     {title: "Nome",     item: function(item){return item.nome}, edit: { item: "nome", function: _editar, width: "100%"}},
                     {title: "Cargo",    item: function(item){return item.cargo}, align: "center"},
                     {title: "Telefone", item: function(item){return item.contato.telefone}}
                 ];

                 vm.subgrid.hide = {all:true};



