export class ModalCreateNewMeasureController {

  constructor($log, $uibModalInstance, BCL, Project) {
    'ngInject';

    const vm = this;
    vm.$log = $log;
    vm.$uibModalInstance = $uibModalInstance;
    vm.BCL = BCL;
    vm.Project = Project;
    vm.measure = '';
    vm.newDisplayName = '';
    vm.newDescription = '';
    vm.newModelerDescription = '';
    vm.measureTypes = ['OpenStudio', 'EnergyPlus', 'Reporting'];
    vm.measureType = vm.measureTypes[0];

    vm.bclCategories = vm.BCL.getBCLCategories();

    vm.taxonomies = [];
    _.forEach(vm.bclCategories, (category) => {
      vm.taxonomies.push(category.name);
    });
    vm.taxonomy = vm.taxonomies[0];

    vm.children = [];
    vm.getTaxonomyChildren(vm.taxonomy);

    vm.tags = '';
    vm.makeMeasureTags();

    //vm.measureDir = vm.Project.getProjectMeasuresDir();
    vm.measureDir = vm.Project.getMeasuresDir();
  }

  getTaxonomyChildren(taxonomy) {
    const vm = this;
    vm.$log.debug('ModalCreateNewMeasureController::getTaxonomyChildren');
    const index = vm.taxonomies.indexOf(taxonomy);

    _.forEach(vm.bclCategories[index].children, (child) => {
      vm.children.push(child.name);
    });
    vm.child = vm.children[0];
    vm.makeMeasureTags();
  }

  makeMeasureTags() {
    const vm = this;
    vm.$log.debug('ModalCreateNewMeasureController::makeMeasueTag');
    vm.tags = vm.taxonomy + '.' + vm.child;
  }

  ok() {
    const vm = this;
    const params = {
      measure_dir: vm.measureDir.path(),
      display_name: vm.newDisplayName,
      class_name: _.upperFirst(_.camelCase(vm.newDisplayName)),
      taxonomy_tag: vm.tags,
      measure_type: vm.measureType,
      description: vm.newDescription,
      modeler_description: vm.newModelerDescription
    };

    vm.$log.debug('ModalCreateNewMeasureController::ok params: ', params);
    vm.$uibModalInstance.close(params);
  }

  cancel() {
    const vm = this;
    vm.$uibModalInstance.dismiss('cancel');
  }

}