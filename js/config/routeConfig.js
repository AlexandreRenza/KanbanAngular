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
                histories: function (projectsApiService) {
                    return projectsApiService.getProjectsByID(sessionStorage.getItem("project_id"));
                }
            }
        
        });

        $routeProvider.when("/sprint", {

            templateUrl: "view/sprint.html",
            controller: "sprintCtl",
            resolve: {
                sprints: function (projectsApiService) {
                    return projectsApiService.getProjectsByID(sessionStorage.getItem("project_id"));
                }
            }
        
        });

        $routeProvider.when("/board", {

            templateUrl: "view/board.html",
            controller: "boardCtl"
            
        
        });


        $routeProvider.when("/alertproject", {

            templateUrl: "view/alertproject.html"
            
        
        });

       /// $routeProvider.otherwise({redirectTo: "/project"});

});