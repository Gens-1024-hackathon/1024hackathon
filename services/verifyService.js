/**
 * Created by JXY on 2015/6/4.
 */
/**
 * 字段校验服务
 */
(function(){
    angular.module('app')
        .factory('verifyService',function(){
            return{
                verifyEmpty:function(input){
                    return verifyEmpty(input);
                },
                verifyTel:function(tel){
                    return verifyTel(tel);
                },
                verifyLength:function(input,minLength,maxLength){
                    return verifyLength(input,minLength,maxLength);
                },
                verifySize: function(input,min){
                    return verifySize(input,min);
                },
                verifySame:function(firstInput,secondInput){
                    return verifySame(firstInput,secondInput);
                }
            };

            /**
             * 验证输入是否为空
             * @param input
             * @returns true 空
             *           false 非空
             */
            function verifyEmpty(input)
            {
                return (input === null || input === '');
            }

            /**
             * 验证输入手机号是否正确
             * @param telephone
             * @returns true 不正确
             *           false 正确
             */
            function verifyTel(telephone){
                var regExp = new RegExp('^1\\d{10}$');
                return !regExp.test(telephone);
            }

            /**
             * 验证输入的长度是否正确
             * @param input
             * @param minLength
             * @param maxLength
             * @returns true 不正确
             *           fasle 正确
             */
            function verifyLength(input,minLength,maxLength){
                if(maxLength === undefined){
                    maxLength = 0;
                }
                return (input.length < minLength || input.length > maxLength);
            }

            /**
             * 验证数字是否小于等于指定数字
             * @param input
             * @param min
             * @returns true 小于等于
             *           false 大于
             */
            function verifySize(input,min){
                if(min === undefined){
                    min = 0;
                }
                return (Number(input) <= Number(min));
            }

            /**
             * 验证两次输入是否一致
             * @param firstInput
             * @param secondInput
             * @returns true 不一致
             *           false 一致
             */
            function verifySame(firstInput,secondInput){
                return (firstInput!=secondInput);
            }
        })
})();