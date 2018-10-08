/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import ApiService from "../../../services/api.service";
import TicketService from "../../../services/ticket.service";

const ApiHeaderComponent: ng.IComponentOptions = {
  bindings: {
    api: '<',
    apiRatingSummary: '<',
    apiPortalHeaders: '<'
  },
  template: require('./api-header.html'),
  controller: function(
    Constants,
    ApiService: ApiService,
    $state,
    $stateParams,
    $rootScope,
    TicketService: TicketService,
    $window) {
    'ngInject';
    this.ratingEnabled = ApiService.isRatingEnabled();
    this.supportEnabled = TicketService.isSupportEnabled();

    $rootScope.$on('onRatingSave', () => {
      ApiService.getApiRatingSummaryByApi($stateParams.apiId).then((response) => {
        this.apiRatingSummary = response.data;
      });
    });

    this.$onInit = () => {
      const apiNavbar = document.getElementById("api-navbar");
      const headerDetail = document.getElementById("header-detail");
      const headerTitle = document.getElementById("header");
      const plans = document.getElementById("plans");
      $window.onscroll = () => {
        if ($window.pageYOffset > 0) {
          headerDetail.style.display="none";
          headerTitle.classList.add("sticky");
          apiNavbar.classList.add("sticky");
          plans.classList.add("sticky");
        } else {
          headerDetail.style.display="flex";
          headerTitle.classList.remove("sticky");
          apiNavbar.classList.remove("sticky");
          plans.classList.remove("sticky");
        }
      };
    };

    this.scrollToPlans = () => {
      const plans = document.getElementById("plans");
      plans.scrollIntoView();
    }
  }
};

export default ApiHeaderComponent;
