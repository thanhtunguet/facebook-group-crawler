import { Model } from 'react3l/core';

export class Post extends Model {
  public id?: string = '';

  public content?: string = '';

  public postURL?: string = '';

  public links?: string[] = [];

  public photos?: string[] = [];
}
