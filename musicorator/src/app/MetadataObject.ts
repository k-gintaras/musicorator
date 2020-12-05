export interface MetadataObject {
  name: string; // is also id, if duplicate, it should just pick 1?
  dir: string;
  newDir: string;
  tagObjects: TagObject[];
  isMissingTags: boolean;
  isMoved: boolean;
  isSelected: boolean;
  isClicked: boolean;
}

export interface MetadataObjectSimple {
  name: string; // is also id, if duplicate, it should just pick 1?
  dir: string;
  newDir: string;
  tagObjects: string[];
  isMissingTags: boolean;
  isMoved: boolean;
  isSelected: boolean;
  isClicked: boolean;
}

export interface TagObject {
  name: string; // actual value
  group: string; // suggestion object
}

// to not deal with duplicates, metadataObject will be used in a map of names
