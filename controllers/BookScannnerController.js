/**
 * Created by jiaoxiangyu on 15/10/24.
 */
angular.module('app').controller('BookScannerController',BookScannerController);

//@Inject
function BookScannerController($state,$q,verifyService){

    var myScope = this;
    var book = _model.Book;

    function initialize(){
        //todo cleardata
        if($state.params.edit != ''){
            $q.when(book.findById($state.params.edit))
                .then(function(result){
                    console.log(result);
                    myScope.tempBook = result;
                    myScope.tempBookName = result.title;
                    myScope.tempBookAuthor = result.author;
                })
        }
    }

    //todo formcheck
    this.checkData = function(){
        if(verifyService.verifyEmpty(myScope.tempBookName)){
            //todo 书名不能为空
            return false;
        }else if(verifyService.verifyEmpty(myScope.tempBookAuthor)){
            //todo 作者不能为空
            return false;
        }else{
            return true;
        }
    };

    //todo formcommit
    this.saveBook = function () {
        if(myScope.checkData() === false){
            return;
        }
        if($state.params.edit === ''){
            $q.when(book.create({
                    type: 'book',
                    title: myScope.tempBookName,
                    author: myScope.tempBookAuthor
                }))
                .then(function(){
                    //todo <书名>已添加
                    console.log('<书名>已添加');
                    history.go(-1);
                })
        }else{
            myScope.tempBook.title = myScope.tempBookName;
            myScope.tempBook.author = myScope.tempBookAuthor;
            $q.when(myScope.tempBook.save())
                .then(function(result) {
                    console.log(result);
                    //todo <书名>已修改
                    console.log('<书名>已修改');
                    history.go(-1);
                })
        }
    };

    /**
     * 取消返回
     */
    this.cancel = function(){
        history.go(-1);
    };

    initialize();
}