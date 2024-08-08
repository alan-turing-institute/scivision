export enum TaskEnum {
    'classification',
    'object-detection',
    'segmentation',
    'thresholding',
    'shape-analysis',
    'object-tracking',
    'other',
}

export type ModelEntries = {
    name: string
    description: string
    tags?: string[]
    tasks?: TaskEnum[]
    institution?: string[]
    scivision_usable?: boolean
    domains?: string[]
    url?: string
    pkg_url: string
}

export type Model = {
    catalog_type: string
    name: string
    entries: ModelEntries[]
}

export type DatasourceEntries = {
    name: string
    description: string
    tags?: string[]
    tasks?: TaskEnum[]
    institution?: string[]
    labels_provided?: boolean
    domains?: string[]
}

export type Datasource = {
    catalog_type: string
    name: string
    entries: DatasourceEntries[]
}
