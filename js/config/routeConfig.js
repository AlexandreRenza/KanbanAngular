angular.module("kanbanApp").config(function($routeProvider){

        $routeProvider.when("/project", {

            templateUrl: "view/project.html",
            controller: "projectCtl",
            resolve: {
                projects: function (projectsApiService) {
                    return projectsApiService.getProjects();
                }
            }
        
        });
        $routeProvider.when("/history", {

            templateUrl: "view/history.html",
            controller: "historyCtl",
            resolve: {
                histories: function (historiesApiService) {
                    return historiesApiService.getHistories();
                }
            }
        
        });

        $routeProvider.when("/sprint", {

            templateUrl: "view/sprint.html",
            controller: "sprintCtl",
            resolve: {
                sprints: function (sprintsApiService) {
                    return sprintsApiService.getSprints();
                }
            }
        
        });

        $routeProvider.when("/board", {

            templateUrl: "view/board.html"
            
        
        });

        $routeProvider.otherwise({redirectTo: "/project"});

});