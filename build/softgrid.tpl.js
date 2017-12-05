angular.module('softgrid.directive').run(['$templateCache', function($templateCache) {$templateCache.put('softgrid.html','\n<div class="softgrid-display" ng-class="{\'softgrid-display-fullscreen\': softgrid.fullscreen}" ng-style="sgControls.fullscreen && softgrid.fullscreen ? { \'z-index\': sgControls.fullscreen.zindex, \'top\': sgControls.fullscreen.top + \'px\'} : \'\'">\n\n    <div class="grid-controles" ng-style="sgControls.fullscreen && softgrid.fullscreen ? { \'z-index\': (sgControls.fullscreen.zindex + 1), \'top\': (sgControls.fullscreen.top) + \'px\'} : \'\'">\n\n        <div class="row" ng-hide="hide.all">\n\n            <div class="col-md-3">\n\n                <div ng-hide="hide.filter || hide.all">\n\n                    <label>Filtrar</label>\n                    <div class="input-group">\n                        <span class="input-group-addon" id="filtro-addon"><span class="fa fa-search"></span></span>\n                        <input type="text" class="form-control" ng-model="sg_filter" placeholder="Palavra-chave" aria-describedby="filtro-addon">\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="col-md-2">\n\n                <div class="form-group" ng-hide="hide.linesPage || hide.all || hide.pagination" style="margin-bottom: 0;">\n\n                    <label>Linhas por p\xE1gina</label>\n\n                    <div class="input-group" style="width: 120px;">\n\n                        <span class="input-group-btn">\n                            <button class="btn btn-default" type="button" ng-click="sg_changeLinesPerPage(-1)">-</button>\n                        </span>\n\n                        <input class="form-control" value="{{sg_linesPerPage}}">\n\n                        <span class="input-group-btn">\n\t\t\t\t\t\t\t<button class="btn btn-default" type="button" ng-click="sg_changeLinesPerPage(1)">+</button>\n\t\t\t\t\t\t</span>\n\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="col-md-2">\n\n                <div ng-hide="hide.options || hide.all">\n\n                    <label>Op\xE7\xF5es</label>\n\n                    <div class="input-group">\n                        <input type="text" class="form-control" aria-label="..." value="{{data.length}} encontrado(s)" disabled="true">\n                        <div class="input-group-btn">\n                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="fa fa-bars"></span></button>\n                            <ul class="dropdown-menu dropdown-menu-right">\n                                <li ng-repeat="item in sgMenu">\n                                    <a ng-click="item.function()"><span class="{{item.icon}}"></span> {{item.title}}</a>\n                                </li>\n                                <li role="separator" class="divider" ng-show="menu"></li>\n                                <li><a ng-click="softGridToExcel()"><span class="fa fa-file-excel-o"></span> Gerar Excel</a></li>\n                            </ul>\n                        </div>\n                    </div>\n\n                    <div ng-if="!subgrid">\n                    <a href="#" ng-show="false"  id="softDownload"></a>\n                    </div>\n\n                </div>\n\n            </div>\n\n            <div class="col-md-2">\n\n                <div ng-hide="hide.fullscreen || hide.all">\n\n                    <label>&nbsp;</label><br>\n                    <button class="btn btn-default" ng-click="softgrid.fullscreen = softgrid.fullscreen ? false : true"><span class="fa fa-expand" ng-class="{\'fa-compress\': softgrid.fullscreen}"></span>\n\n                        {{ softgrid.fullscreen ? (sgControls.fullscreen.on ? sgControls.fullscreen.on : \'Tela normal\') : (sgControls.fullscreen.off ? sgControls.fullscreen.off : \'Tela cheia\') }}\n\n                    </button>\n\n                </div>\n\n            </div>\n\n            <div class="col-md-3">\n\n                <nav aria-label="Page navigation" class="pull-right" ng-hide="hide.pagination || hide.all">\n\n                    <label>Pagina\xE7\xE3o</label>\n\n                        <ul class="pagination">\n\n                            <li ng-repeat="soft_page in soft_pages" ng-class="{\'active\': soft_page.active}">\n                                <a ng-click="sg_changePage(soft_page.value)" ng-bind-html="soft_page.text"></a>\n                            </li>\n\n                        </ul>\n\n                </nav>\n\n            </div>\n\n        </div>\n\n    </div>\n\n    <div class="row">\n\n        <div class="col-md-12">\n\n                <div class="softgrid-container">\n\n                    <div ng-style=" width ? { \'width\': width + \'px\' } : { \'width\': \'100%\' }">\n\n                        <table ng-attr-id="{{!subgrid ? \'none\': \'softgrid\'}}" class="softgrid {{template}}" >\n\n                            <thead>\n\n                                <th ng-show="actions.length > 0 || subgrid">\n\n                                </th>\n\n\t\t\t\t\t\t\t\t<th ng-show="sgControls.create || sgControls.read || sgControls.update || sgControls.delete" style="text-align: center;">\n\t\t\t\t\t\t\t\t\tA\xE7\xF5es\n\t\t\t\t\t\t\t\t</th>\n\n                                <th ng-repeat="col in cols" ng-show="!col.hide" style="text-align:center;">\n\n                                  <span class="title" ng-click="sg_sort(col)">\n\n\t\t\t\t\t\t\t\t\t  {{col.title}}\n\n\t\t\t\t\t\t\t\t\t  <span ng-show="col === sg_orderByCol" class="fa fa-sort-amount-asc" ng-class="{\'fa-sort-amount-desc\' : reverse}"></span>\n\n\t\t\t\t\t\t\t\t  </span>\n\n                                </th>\n\n\t\t\t\t\t\t\t\t<th ng-show="sgControls.active" style="text-align: center;">\n\t\t\t\t\t\t\t\t\t{{sgControls.activeTitle}}\n\t\t\t\t\t\t\t\t</th>\n\n                            </thead>\n\n                            <tbody>\n\n                                <tr ng-init="$last ? sg_hook() : angular.noop()" ng-class="{\'soft-row-striped\': ($index%2)}" ng-repeat-start="row in (dataFiltered = (data | filter: sg_filter | limitTo: sg_linesPerPage : ((sg_currentPage * sg_linesPerPage) - sg_linesPerPage))) track by $index" ng-style="sgControls.changeRowColor(row) === true && {\'background-color\': (sgControls.rowColor ? sgControls.rowColor :\'#e59482\')}" >\n\n                                    <td ng-show="subgrid || actions.length > 0" style="text-align:center; width: {{larguraColunaAcoes}}px">\n\n                                                <!-- bot\xE3o para exibir sub tabela -->\n                                                <button ng-show="subgrid" type="button" class="btn btn-default btn-sm btn-subgrid" ng-click="showSubGrid = showSubGrid ? false : true" style="float: left;">\n                                                    <span class="fa fa-expand" ng-class="{\'fa-compress\': showSubGrid}"></span>\n                                                </button>\n\n                                                <div class="dropdown">\n\n                                                    <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n                                                        <span class="fa fa-bars"></span>\n                                                    </button>\n\n                                                    <ul class="dropdown-menu dropdown-menu-left">\n                                                        <li ng-repeat="action in actions"><a ng-click="action.function(row)"><span class="{{action.icon}}"></span> {{action.title}}</a></li>\n                                                    </ul>\n\n                                                </div>\n\n                                    </td>\n\n\t\t\t\t\t\t\t\t\t<!-- column to actions -->\n\t\t\t\t\t\t\t\t\t<td ng-if="sgControls.create || sgControls.read || sgControls.update || sgControls.delete" style="text-align:center; width: {{larguraColunaControles}}px">\n\n\t\t\t\t\t\t\t\t\t\t<button ng-show="sgControls.create" type="button" class="btn btn-default btn-sm" ng-click="sgControls.create.action(row)" title="{{ sgControls.create.title ? sgControls.create.title : \'Criar\' }}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="fa fa-plus"></span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t\t<button ng-show="sgControls.read" type="button" class="btn btn-default btn-sm"   ng-click="sgControls.read.action(row)" title="{{ sgControls.read.title ? sgControls.read.title : \'Ver\' }}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="fa fa-search"></span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t\t<button ng-show="sgControls.update" type="button" class="btn btn-default btn-sm" ng-click="sgControls.update.action(row)" title="{{ sgControls.update.title ? sgControls.update.title : \'Atualizar\' }}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="fa fa-pencil"></span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t\t<button ng-show="sgControls.delete" type="button" class="btn btn-default btn-sm" ng-click="sgControls.delete.action(row)" title="{{ sgControls.delete.title ? sgControls.delete.title : \'Deletar\' }}">\n\t\t\t\t\t\t\t\t\t\t\t<span class="fa fa-trash"></span>\n\t\t\t\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t\t\t</td>\n\n                                    <!-- data columns-->\n                                    <td ng-repeat="col in cols track by $index" ng-init="$parent.editing = false" class="opafion">\n\n                                        <input ng-show="editing" ng-init="newvalue = col.item(row)" class="edit-input" ng-model="newvalue" ng-blur="sg_edit(row, col, newvalue, this)" style="width: {{col.edit.width}};">\n\n                                        <div ng-show="!editing" ng-dblclick="sg_openEdit(this, $event)" ng-style="col.align ? { \'text-align\': col.align} : { \'text-align\': \'left\' }">\n\n                                            <label ng-hide="col.popOver" style="width: 100%;">\n\n                                                {{temp = sg_mask(col.type, (col.item(row) | limitTo: (col.maxLength ? col.maxLength : 999)))}}&nbsp;\n\n                                            </label>\n\n                                            <label style="text-decoration: underline; cursor: pointer" ng-show="col.popOver"   popover data-toggle="popover" data-trigger="hover" data-content="{{col.item(row)}}">{{(col.item(row) | limitTo: (col.maxLength ? col.maxLength : 999))}}</label>\n\n                                        </div>\n\n                                    </td>\n\n\t\t\t\t\t\t\t\t\t<!-- Coluna para checkbox -->\n\t\t\t\t\t\t\t\t\t<td style="text-align: center;" ng-show="sgControls.active">\n\t\t\t\t\t\t\t\t\t\t<label class="switch">\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" ng-checked="sgControls.activeCol(row)" ng-click="sgControls.activeFunction(row)">\n\t\t\t\t\t\t\t\t\t\t\t<div class="slider round"></div>\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</td>\n\n                                </tr>\n                                <tr ng-repeat-end="" ng-show="subgrid" ng-hide="!showSubGrid" ng-class="{\'soft-row-striped\': ($index%2)}"> <!-- Linha para Subtabela -->\n\n                                    <td colspan="{{cols.length + 3}}">\n\n                                        <div class="soft-subgrid-container">\n\n                                            <div ng-if="subgrid">\n\n                                                <softgrid  cols="subgrid.cols" actions="subgrid.actions" data="row[subgrid.object]" hide="subgrid.hide" template="\'soft-subgrid\'" sg-controls="subgrid.controls"></softgrid>\n\n                                            </div>\n\n                                        </div>\n\n                                    </td>\n\n                                </tr>\n\n                                <!-- Exibe uma linha caso n\xE3o haja dados -->\n                                <tr ng-show="!data || data.length <= 0" style="text-align: center;">\n\n                                    <td colspan="{{cols.length + 3}} ">\n                                    N\xE3o h\xE1 dados a serem exibidos.\n                                    </td>\n                                </tr>\n\n                            </tbody>\n\n                        </table>\n\n                    </div>\n\n                </div>\n\n        </div>\n\n    </div>\n\n    <div class="row" ng-hide="hide.pagination || hide.all">\n\n        <div class="col-md-12">\n\n            <nav aria-label="...">\n                <ul class="pager" style="margin-top: 5px;">\n                    <li class="previous"><button class="btn btn-default pull-left" ng-click="sg_changePage(-1)"><span aria-hidden="true">&larr;</span> P\xE1gina anterior</button></li>\n                    <li class="next"><button class="btn btn-default pull-right" ng-click="sg_changePage(0)">Pr\xF3xima p\xE1gina <span aria-hidden="true">&rarr;</span></button></li>\n                </ul>\n            </nav>\n\n        </div>\n\n    </div>\n\n</div>\n\n');}]);