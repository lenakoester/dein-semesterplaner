import React from 'react';
import ModulePlan from './ModulePlan';
import PlanningSection from './PlanningSection';
import moduleplan from './moduleplan.json';
import users from './users.json';

class Home extends React.Component {
  render() {
    var userModules = users.students[0].tracked_modules;
    var modules = moduleplan.degree_course.modules;
    var maxSemester = 6;
    var semesters = [1,2,3,4,5,6].map(function(semester) {
      var filteredModules = modules.filter(function(module) {
        return module.recommended_semester === semester;
      });
      return filteredModules.map(function(module) {
        var userModule = userModules.find(function(userModule) {
          return userModule.module_id === module.id;
        })
        return {
           module: module,
           userModule: userModule
        }
      })
    });

    var completedModules = userModules.filter(function(userModule) {
        return userModule.status === "completed";
    });
    {/* completedModules returns an array of all completed modules by one student */}

    var completedModuleIds = completedModules.map(function(module){
      return module.module_id;
    });
    {/* completedModuleIds returns an array with all the ids of completed courses */}

    var completedModules2 = userModules.filter(function(userModule) {
        if(userModule.status === "completed"){
          return userModule.module_id;
        }   
    });
    
    {/* returns array of all completed courses, but not just the ids */}
    
    {/*for (var i = 0; i < userModules.length; i++) {
      var totalCredits= 0;
     if (userModule[i].status === "completed"){
      totalCredits=+ modules[i].cp;
     }
     return totalCredits;
    };

    {/* We went back and tried to simplify by running through all userModules, searching for completed modules and then returning the cps from modules */}
   
    return (
      <div>
        <ModulePlan semesters={semesters}/>
        <PlanningSection />
      </div>
    )
  }
}

export default Home
