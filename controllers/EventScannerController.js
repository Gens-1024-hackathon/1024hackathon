/**
 * Created by jiaoxiangyu on 15/10/24.
 */
angular.module('app').controller('EventScannerController',EventScannerController);

//@ngInject
function EventScannerController($q,$state,verifyService){

    var myScope = this;
    var event = _model.EventGroup;

    function initialize(){
        //todo cleardata
        myScope.title = $state.params.title;
        if($state.params.edit != ''){
            $q.when(event.findById($state.params.edit))
                .then(function(result){
                    console.log(result);
                    myScope.tempEvent = result;
                    myScope.start = result.anchor[0].value;
                    myScope.end = result.anchor[1].value;
                    myScope.description = result.description;
                })
        }
    }

    this.cancel = function() {
      window.history.back();
    };

    //todo formcheck
    this.dataCheck = function(){
        var intTest = /^-?\d+$/;
        if(verifyService.verifyEmpty(myScope.start)){
            //todo 起始日期不能为空
            return false;
        }else if(!intTest.test(myScope.start)){
            //todo 起始日期必须是数字
            return false;
        }else if(Number(myScope.start) < -2500000){
            //todo 起始日期不能早于公元前250万年
            return false;
        }else if(!intTest.test(myScope.start)){
            //todo 结束日期必须是数字
            return false;
        }else if(Number(myScope.end) > 2500000){
            //todo 结束日期不能晚于公元250万年
            return false;
        }else if(Number(myScope.start) > Number(myScope.end)){
            //todo 结束日期不能早于开始日期
            return false;
        }else if(verifyService.verifyEmpty(myScope.description)){
            //todo 事件描述不能为空
            return false;
        }else{
            return true;
        }
    };

    //todo formcommit
    this.saveEvent = function(){
        if(myScope.dataCheck() === false){
            return;
        }
        if($state.params.edit === ''){
            var anchor = [];
            if(Number(myScope.start) === Number(myScope.end)){
                anchor = [
                    {
                        value: myScope.start
                    },
                    {
                        value: Number(myScope.end)+1
                    }
                ];
            }else{
                anchor = [
                    {
                        value: myScope.start
                    },
                    {
                        value: myScope.end
                    }
                ];
            }
            $q.when(event.create({
                bookId: $state.params.id,
                description: myScope.description,
                anchor:anchor
            }))
                .then(function(result){
                    console.log(result);
                    //todo 事件已添加
                    console.log('事件已添加');
                    history.go(-1);
                })
        }else{
            if(Number(myScope.start) === Number(myScope.end)){
                myScope.tempEvent.anchor[0].value = myScope.start;
                myScope.tempEvent.anchor[1].value = Number(myScope.end)+1;
                myScope.tempEvent.description = myScope.description;
            }else{
                myScope.tempEvent.anchor[0].value = myScope.start;
                myScope.tempEvent.anchor[1].value = myScope.end;
                myScope.tempEvent.description = myScope.description;
            }
            $q.when(myScope.tempEvent.save())
                .then(function(result){
                    console.log(result);
                    //todo 事件已修改
                    console.log('事件已修改');
                    history.go(-1);
                })
        }


    };

    initialize();
}
