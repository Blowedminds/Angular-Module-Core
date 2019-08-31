import { TestBed, inject } from '@angular/core/testing';

import { RoutingListService } from './routing-list.service';

describe('RoutingListService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingListService]
    });
  });


  it('should be created', inject([RoutingListService], (service: RoutingListService) => {
    expect(service).toBeTruthy();
  }));

  it('should get url test.test correctly', inject([RoutingListService], (service: RoutingListService) => {
    service.routes = {
      test: {
        url: 'test/',
        test: 'test'
      }
    };

    expect(service.getUrl('test.test')).toEqual('test/test');
  }));

  it('should parse empty string', inject([RoutingListService], (service: RoutingListService) => {
    expect(service.parseKey('')).toEqual([]);
  }));

  it('should parse article.content', inject([RoutingListService], (service: RoutingListService) => {
    expect(service.parseKey('article.content')).toEqual(['article', 'content']);
  }));

  it('should parse .article.content', inject([RoutingListService], (service: RoutingListService) => {
    expect(service.parseKey('.article.content')).toEqual(['article', 'content']);
  }));

  it('should parse article.content.', inject([RoutingListService], (service: RoutingListService) => {
    expect(service.parseKey('article.content.')).toEqual(['article', 'content']);
  }));

  it('should parse article.content.test', inject([RoutingListService], (service: RoutingListService) => {
    expect(service.parseKey('article.content.test')).toEqual(['article', 'content', 'test']);
  }));

  it('should parse article.content.test.', inject([RoutingListService], (service: RoutingListService) => {
    expect(service.parseKey('article.content.test.')).toEqual(['article', 'content', 'test']);
  }));

  it('should parse .article.content.test', inject([RoutingListService], (service: RoutingListService) => {
    expect(service.parseKey('.article.content.test')).toEqual(['article', 'content', 'test']);
  }));

});
