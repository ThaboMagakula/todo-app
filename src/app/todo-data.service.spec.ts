import { TestBed, inject } from '@angular/core/testing';

import { TodoDataService } from './todo-data.service';
import {ApiService} from './api.service';
import {ApiMockService} from './api-mock.service';


describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoDataService,
        {
          provide: ApiService,
          useClass: ApiMockService
        }
      ]
    });
  });

  it('should be created', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));


  });
