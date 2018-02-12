angular
    .module("rondaApp", ['ngMaterial'])
	.config(function($httpProvider) {

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push('httpRequestInterceptor');

    });


