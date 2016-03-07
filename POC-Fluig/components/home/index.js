'use strict';

app.home = kendo.observable({
    onShow: function () {},
    afterShow: function () {
        app.mobileApp.hideLoading();
    }
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_home


// START_CUSTOM_CODE_homeModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function (parent) {
    var provider = app.data.pocFluig,
    mode = 'signin',
    registerRedirect = 'novoContatoView',
    signinRedirect = 'novoContatoView',
    init = function (error) {
		
        if (error) {
            if (error.message) {
                app.notification.show(error.message,'error');
            }
        }

        if (app.user) {
            provider.Users.logout().then(function(){
                console.log('User Logout');        
            });
        }

        var activeView = mode === 'signin' ? '.signin-view' : '.signup-view';
        app.mobileApp.hideLoading();
        if (provider.setup && provider.setup.offlineStorage && !app.isOnline()) {
            $('.offline').show().siblings().hide();
        } else {
            $(activeView).show().siblings().hide();
        }
    },
    successHandler = function (data) {

        var redirect = mode === 'signin' ? signinRedirect : registerRedirect;

        if (data && data.result) {
            app.user = data.result;
            setTimeout(function () {
                app.mobileApp.navigate('components/' + redirect + '/view.html');
            }, 0);
        } else {
            init();
        }
    },
    homeModel = kendo.observable({
        displayName: '',
        userName: '',
        email: '',
        password: '',
        validateData: function (data) {
            if (!data.userName) {
                app.notification.show('User não preenchido!','error');
                return false;
            }

            if (!data.password) {
                app.notification.show('Senha não preenchida!','error');
                return false;
            }

            return true;
        },
        signin: function () {
            var model = homeModel,
            userName = model.userName.toLowerCase(),
            password = model.password;

            if (!model.validateData(model)) {
                return false;
            }
            app.mobileApp.showLoading();

            provider.Users.login(userName, password, successHandler, init);
        },
        register: function () {
            var model = homeModel,
            email = model.email.toLowerCase(),
            userName = model.userName.toLowerCase(),
            password = model.password,
            displayName = model.displayName,
            attrs = {
                User: userName,
                Email: email,
                DisplayName: displayName
            };
            console.log(email,userName,password,attrs);

            if (!model.validateData(model)) {
                return false;
            }
            app.mobileApp.showLoading();

            provider.Users.register(userName, password, attrs, successHandler, init);
        },
        facebookLogin: function () {

            var facebookConfig = {
                name: 'Facebook',
                loginMethodName: 'loginWithFacebook',
                endpoint: 'https://www.facebook.com/dialog/oauth',
                response_type: 'token',
                client_id: 1086764318010540,
                redirect_uri: "http://www.facebook.com/connect/login_success.html",
                access_type: 'online',
                scope: 'email',
                display: 'touch'
            };

            var facebook = new IdentityProvider(facebookConfig);
            app.mobileApp.showLoading();
            facebook.getAccessToken(function (token) {
                provider.Users.loginWithFacebook(token)
                .then(function () {
                    app.mobileApp.hideLoading();
                    console.log(facebook.getCurrentUser());
                    provider.Users.currentUser(successHandler, init);
                });
            });
        },
        toggleView: function () {
            mode = mode === 'signin' ? 'register' : 'signin';
            init();
        },
        resetForm: function () {
            this.set("email", "");
            this.set("password", "");
            init();
        }
    });

    parent.set('homeModel', homeModel);
    parent.set('afterShow', function () {
        homeModel.resetForm();
    });

})(app.home);
// END_CUSTOM_CODE_homeModel