import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('./project.mapper', () => {
  it('should return an empty project when input is null', () => {
    const result = mapProjectFromApiToVm(null);
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return an empty project when input is undefined', () => {
    const result = mapProjectFromApiToVm(undefined);
    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should map project from API to ViewModel correctly', () => {
    const mockProject: apiModel.Project = {
      comments: 'asdf',
      externalId: '324',
      name: 'myName',
      id: '5252521',
      isActive: true,
      employees: [
        {
          id: '2342',
          employeeName: 'employee',
          isAssigned: false
        }
      ]
    };
    const expectedProject: viewModel.Project = {
      ...mockProject,
      employees: mockProject.employees.map(x => ({...x})),
    };
    const result = mapProjectFromApiToVm(mockProject);
    expect(result).toEqual(expectedProject);
  });

  it('should return a project with empty employees array when API project has no employees', () => {
    const mockProject: apiModel.Project = {
      comments: 'asdf',
      externalId: '324',
      name: 'myName',
      id: '5252521',
      isActive: true,
      employees: [],
    };
    const result = mapProjectFromApiToVm(mockProject);
    expect(result.employees).toEqual([]);
  });
});
