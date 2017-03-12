(function (angular) {

  angular.module('iFundDistributor')
    .service('KickassService', function ($http) {

      this.notifySubscription = function (digitalIdAddress, fund, subscriptionContractAddress, kickass_uri, callback) {

          $http.get(kickass_uri + '/user/keyByAddress/' + digitalIdAddress).then(function(res) {
            var contributorKey = res.data;
            var serviceType = 'MyBank';
            var notificationTitle = serviceType + "asked for the authorization to use your digital ID to subscribe to " +
              fund.name ;

                $http.post(kickass_uri + '/notification', {
                  userKey: contributorKey,
                  notification: {
                    title: notificationTitle,
                    action: 'acceptSubscription',
                    data: {
                      serviceName: fund.name,
                      serviceType: serviceType,
                      termsAndConditions: fund.requirements,
                      subscriptionContractAddress : subscriptionContractAddress,
                      validators : [
                        {
                          role : "Risk profile evaluator",
                          name : fund.riskProviderName
                        },
                        {
                          role : "Validator requirements provider",
                          name : fund.checkListProviderName
                        },
                        {
                          role : "Requirements evaluator",
                          name : fund.validatorName
                        },
                      ]
                    },
                    targetKey: contributorKey
                  }
                }).then(function() {
                  callback(null);
                }).catch(function(err) {
                  callback(err);
                });
              })
            .catch(function(err) { callback(err);});
          };
      });

})(window.angular);
