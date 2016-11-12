(function(){
    'use scrict';

    angular
        .module('timeTracker')
        .controller('TimeEntry', TimeEntry);

        function TimeEntry(time){
            var vm = this;

            vm.timeentries = [];
            vm.totalTime = {};

            // Initialize the clockIn and clockOut times to the current time.
            vm.clockIn = new Date();
            vm.clockOut = new Date();


            time.getTime().then(function(results){
                vm.timeentries = results;
                console.log(vm.timeentries);
            }, function(error){
                console.log(error);
            });

           function updateTotalTime(timeentries){
                vm.totalTime = time.getTotalTime(timeentries);
           }

           vm.logNewTime = function(){
                if(vm.clockOut < vm.clockIn){
                    alert("You can't clock out before you clock in!");
                    return;
                }
                if(vm.clockOut - vm.clockIn === 0){
                    alert("Your time entry has to be greater than zero!");
                    return;
                }

                vm.timeentries.push({
                    "user_id":1,
                    "user_firstname":"Ryan",
                    "user_lastname":"Chenkie",
                    "start_time":vm.clockIn,
                    "end_time":vm.clockOut,
                    "loggedTime": time.getTimeDiff(vm.clockIn, vm.clockOut),
                    "comment":vm.comment
                });
                updateTotalTime(vm.timeentries);
                vm.comment ="";
           }
        }
})();
