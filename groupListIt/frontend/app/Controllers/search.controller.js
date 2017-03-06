(function() {
    'use strict';

    angular
        .module('listIt')
        .controller('searchController', searchController);

    searchController.$inject = ['searchFactory', '$state', 'localStorageFactory'];

    /* @ngInject */
    function searchController(searchFactory, $state, localStorageFactory) {
        var s = this;
        s.title = 'searchController';



        ////////////////

        s.searchProducts = function() {
            var data = {
                'CategoryName': s.categories,
                'Keyword': s.keyword,
                'Condition': s.condition,
                'MaxPrice': s.maxPrice,
                'MinPrice': s.minPrice
            }
            if (data.CategoryName == null && data.Keyword == null && data.Condition == null && data.MaxPrice == null && data.MinPrice == null) {
                sweetAlert("Oops...", "Please fill at least one field", "error");
            } else {
                searchFactory.searchItems(data).then(function(response) {
                    s.response = response.data;
                    s.categories = ''
                    s.keyword = ''
                    s.condition = ''
                    s.maxPrice = ''
                    s.minPrice = ''
                    console.log(response);
                })
            }
        }
        s.searchProfileProducts = function() {
            var data = {
                UserId: localStorageFactory.getLocalStorage('userId')
            }
            searchFactory.searchProfileItems(data).then(function(response) {
                s.response = response.data;
                console.log(response);
            })
        }
    }
})();
