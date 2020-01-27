
(function () {
    'use strict';

    angular.module('kanbanApp')
        .directive('csMultiSelect', [csMultiSelect]);

    function csMultiSelect () {
        return {
            templateUrl: './js/components/cs-multi-select/csMultiSelect.template.html',
            scope: {
                listaA: '=',
                labelListaA: '=',
                listaB: '=',
                labelListaB: '=',
                exibir: '=',
                desabilitado: '=?',
                onAdd: '&?',
                onRemove: '&?'
            },
            link: function(scope) {
                scope.directionListAToListB = true;

                scope.elementToAdd = [];
                scope.elementToDelete = [];

                function init() {
                    scope.desabilitado = angular.isDefined(scope.desabilitado) ? scope.desabilitado : false;
                }

                scope.doMoveOneElement = function (directionListAToListB) {
                    const ELEMENT_NOT_FOUND = -1;

                    if (directionListAToListB) {
                        if (scope.elementToAdd.length > 0) {
                            scope.elementToAdd.forEach(e => {
                                let indexOfItem = scope.listaA.findIndex(item => {
                                    return angular.equals(item, e)
                                });

                                if (indexOfItem !== ELEMENT_NOT_FOUND) {
                                    let element = scope.listaA.splice(indexOfItem, 1);
                                    scope.listaB.push(element[0]);
                                }
                            });

                            if(angular.isDefined(scope.onAdd)){
                                scope.onAdd();
                            }
                        }
                    } else {
                        if (scope.elementToDelete.length > 0) {
                            scope.elementToDelete.forEach(e => {
                                let indexOfItem = scope.listaB.findIndex(item => {
                                    return angular.equals(item, e)
                                });

                                if (indexOfItem !== ELEMENT_NOT_FOUND) {
                                    let element = scope.listaB.splice(indexOfItem, 1);
                                    scope.listaA.push(element[0]);
                                }
                            });

                            if(angular.isDefined(scope.onRemove)){
                                scope.onRemove();
                            }
                        }
                    }

                    scope.elementToAdd = [];
                    scope.elementeToDelete = [];
                };

                scope.doMoveAllElement = function (directionListAToListB) {
                    if (directionListAToListB) {
                        scope.listaB = scope.listaB.concat(scope.listaA);
                        scope.listaA.length = 0;

                        if(angular.isDefined(scope.onAdd)){
                            scope.onAdd();
                        }
                    } else {
                        scope.listaA = scope.listaA.concat(scope.listaB);
                        scope.listaB.length = 0;

                        if(angular.isDefined(scope.onRemove)){
                            scope.onRemove();
                        }
                    }
                };

                init();
            }
        };
    }
})();