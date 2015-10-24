/**
 * Created by jiaoxiangyu on 15/10/24.
 */
angular.module('app').controller('DisplayListController',DisplayListController);

//@ngInject
function DisplayListController($q,$state){

    var myScope = this;
    var book = _model.Book;
    var eventGroup = _model.EventGroup;

    function initialize(){
        myScope.getBookList();
        myScope.events = [];
        var bk = {};
        if($state.params.id != ''){
            $q.when(book.findById($state.params.id))
                .then(function(result){
                    bk = result;
                    myScope.getEventList(bk);
                });
        }else if(myScope.books.length != 0) {
            $q.when(book.findById(myScope.books[0]._id))
                .then(function (result) {
                    bk = result;
                    myScope.getEventList(bk);
                })
        }
    }

    this.changeBook = function(book){
        console.log(book);
        $state.go('displayList',{id:book._id},{reload:true});
        myScope.getEventList(book);
    };

    //todo get Book List
    this.getBookList = function(){
        $q.when(book.findAll())
            .then(function(result){
                console.log(result);
                myScope.books = result;
            })
    };

    //todo get event List By BookId
    this.getEventList = function(book){
        $q.when(book.getEventGroups())
            .then(function(results){
                console.log(results);
                myScope.events = results;
            })
    };

    this.editBook = function(book){
        $state.go('bookScanner',{edit:book._id},{reload:true})
    };

    this.deleteBook = function(bo){
        $q.when(book.findById(bo._id))
            .then(function(result){
            console.log(result);
            $q.when(result.destroy())
                .then(function(result){
                    console.log(result);
                    initialize();
                })
        })
    };

    this.editEvent = function(event){
        var selectedBook = {};
        if($state.params.id === ''){
            $q.when(book.findById(myScope.books[0]._id))
                .then(function(result){
                    console.log(result);
                    selectedBook = result;
                    $state.go('eventScanner',{edit:event._id,id:selectedBook._id,title:selectedBook.title},{reload:true});
                })
        }else{
            $q.when(book.findById($state.params.id))
                .then(function(result){
                    console.log(result);
                    selectedBook = result;
                    $state.go('eventScanner',{edit:event._id,id:selectedBook._id,title:selectedBook.title},{reload:true});
                })
        }
    };

    this.deleteEvent = function(event){
        $q.when(eventGroup.findById(event._id))
            .then(function(result){
                console.log(result);
                $q.when(result.destroy())
                    .then(function(result){
                        console.log(result);
                        initialize();
                        //$state.go('displayList',{id:$stat},{reload:true});
                    })
            })
    };

    /**
     *  jump to Book Scanner
     */
    this.visitBookScanner = function(){
        $state.go('bookScanner',{},{reload:true});
    };

    //todo jump to Event Scanner
    this.visitEventScanner = function(book){
        $state.go('eventScanner',{id:book._id,title:book.title},{reload:true})
    };

    initialize();
}