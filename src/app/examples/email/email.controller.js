(function() {
    'use strict';

    angular
        .module('app.examples.email')
        .controller('EmailController', EmailController);

    /* @ngInject */
    function EmailController($scope, $stateParams, $mdDialog, $mdToast, $filter, emails, email, contacts) {
        var vm = this;
        vm.closeEmail = closeEmail;
        vm.deleteEmail = deleteEmail;
        vm.email = email;
        vm.emailAction = emailAction;

        /////////////////

        function closeEmail() {
            $scope.$emit('closeEmail');
        }

        function deleteEmail(email) {
            $scope.$emit('deleteEmail', email);
        }

        function emailAction($event, title) {
            var replyEmail = {
                to: [],
                cc: [],
                bcc: [],
                // add r.e to subject if there is one
                subject: email.subject === '' ? '' : $filter('triTranslate')('R.e: ') + email.subject,
                // wrap previous content in blockquote and add new line
                content: '<br><br><blockquote>' + email.content + '</blockquote>'
            };

            // get contact and add it to to if replying
            angular.forEach(contacts.data, function(contact) {
                if(contact.email === email.from.email) {
                    replyEmail.to.push(contact);
                }
            });

            openEmail($event, replyEmail, $filter('triTranslate')(title));
        }

        function openEmail($event, email, title) {
            $mdDialog.show({
                controller: 'EmailDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/email/email-dialog.tmpl.html',
                targetEvent: $event,
                locals: {
                    title: title,
                    email: email,
                    contacts: contacts,
                    getFocus: true
                },
                focusOnOpen: false
            })
            .then(function(email) {
                // send email sent event
                $scope.$emit('sendEmail', email);
            }, cancelEmail);

            function cancelEmail() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('Email canceled'))
                    .position('bottom right')
                    .hideDelay(3000)
                );
            }
        }
    }
})();
