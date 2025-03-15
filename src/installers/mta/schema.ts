export interface MTASchema {
    /**
     * The schema version that is being used for authoring a descriptor. The schema version should comply with the semantic versioning standard.
     */
    '_schema-version': string;
    /**
     * An application ID, that may contain any number of unicode characters and should be unique in the target runtime environment.
     */
    ID: string;
    /**
     * A free text describing this application.
     */
    description?: string;
    /**
     * The application version that should comply with the semantic versioning standard.
     */
    version: string;
    /**
     * The provider or vendor of this application.
     */
    provider?: string;
    /**
     * A copyright statement from the provider.
     */
    copyright?: string;
    /**
     * A list of modules.
     */
    modules?: MTAModule[];
    /**
     * A list of resources that are required by the modules of this MTA project.
     */
    resources?: MTAResource[];
    /**
     * Global parameters that are used when building or deploying the application
     */
    parameters?: {
        [k: string]: unknown;
    };
    /**
     * Additional information about the global parameters.
     */
    'parameters-metadata'?: {
        overwritable?: boolean;
        optional?: boolean;
        [k: string]: unknown;
    };
    /**
     * It is possible to define parameters in external files. The "includes" section is used to point to those files.
     */
    includes?: {
        /**
         * The name of an "includes" section. This name is used by a builder to generate a parameter section in the deployment descriptor.
         */
        name: string;
        /**
         * A path pointing to a file that contains a map of parameters, either in JSON or in YAML format.
         */
        path: string;
        [k: string]: unknown;
    }[];
    [k: string]: unknown;
}

export interface MTAModule {
    /**
     * The MTA module name which must be unique and cannot be the same as any provided property set or resource name.
     */
    name: string;
    /**
     * The module type that defines the design-time tools for the module.
     */
    type: string;
    /**
     * A free text describing this module.
     */
    description?: string;
    /**
     * The path to a folder that contains the module artifacts.
     */
    path?: string;
    /**
     * A list of modules that must be deployed before deploying the current module.
     */
    'deployed-after'?: string[];
    /**
     * A collection of key-value pairs that are available to the module at runtime.
     */
    properties?: {
        [k: string]: unknown;
    };
    /**
     * Additional information about the module's properties.
     */
    'properties-metadata'?: {
        overwritable?: boolean;
        optional?: boolean;
        datatype?: 'str' | 'int' | 'float' | 'bool';
        [k: string]: unknown;
    };
    /**
     * Configuration parameters that are used when deploying the module to the target runtime environment.
     */
    parameters?: {
        [k: string]: unknown;
    };
    /**
     * Additional information about the module's parameters.
     */
    'parameters-metadata'?: {
        overwritable?: boolean;
        optional?: boolean;
        [k: string]: unknown;
    };
    /**
     * A list of hooks that will be executed for the module.
     */
    hooks?: {
        /**
         * An internal name which can be used for documentation purposes and shown by the deployer.
         */
        name: string;
        /**
         * Defines the type of action that should be executed by the deployer.
         */
        type?: 'task';
        /**
         * A list of strings that define the points at which the hook must be executed.
         */
        phases?: (
            | 'application.before-stop.live'
            | 'application.before-stop.idle'
            | 'application.after-stop.live'
            | 'application.after-stop.idle'
        )[];
        /**
         * Configuration parameters that are used when executing the hook to the target runtime environment.
         */
        parameters?: {
            /**
             * Defines the name of the Cloud Foundry task that should be executed.
             */
            name?: string;
            /**
             * Defines the actual command that is executed as a Cloud Foundry task.
             */
            command: string;
            /**
             * Defines the memory that is available to the Cloud Foundry task.
             */
            memory?: string;
            /**
             * Defines the disk space that is available to the Cloud Foundry task.
             */
            'disk-quota'?: string;
            [k: string]: unknown;
        };
        /**
         * Additional information about the hook's parameters.
         */
        'parameters-metadata'?: {
            overwritable?: boolean;
            optional?: boolean;
            datatype?: 'str' | 'int' | 'float' | 'bool';
            [k: string]: unknown;
        };
        /**
         * List of names either matching a resource name or a provided dependency name provided within the same MTA that are required by this hook.
         */
        requires?: {
            /**
             * An MTA internal name which must match either a provided name, or a resource name within the same MTA.
             */
            name: string;
            /**
             * Parameters can be used to influence the behavior of tools which interpret this descriptor. Parameters are not made available to the hook at runtime. Provided property values can be accessed by "~{<provided-property-name>}". Such expressions can be part of an arbitrary string
             */
            parameters?: {
                [k: string]: unknown;
            };
            /**
             * Additional information about the hook's parameters.
             */
            'parameters-metadata'?: {
                overwritable?: boolean;
                optional?: boolean;
                datatype?: 'str' | 'int' | 'float' | 'bool';
                [k: string]: unknown;
            };
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    }[];
    /**
     * The build parameters define how the module is built by the corresponding tool.
     */
    'build-parameters'?: {
        [k: string]: unknown;
    };
    /**
     * It is possible to define parameters in external files. The "includes" section is used to point to those files.
     */
    includes?: {
        /**
         * The name of an "includes" section. This name is used by a builder to generate a parameter section in the deployment descriptor.
         */
        name: string;
        /**
         * A path pointing to a file that contains a map of parameters, either in JSON or in YAML format.
         */
        path: string;
        [k: string]: unknown;
    }[];
    /**
     * Used to define the named property sets that other modules and resources can require.
     */
    provides?: {
        /**
         * The name of the property set that the module provides. The provided name must be unique and cannot be the same as any resource or module name.
         */
        name: string;
        /**
         * Configures the accessibility of the provided property set; if set to "true", it is publicly accessible and can be consumed by other MTA projects.
         */
        public?: boolean;
        /**
         * A list of properties that are included in this property set.
         */
        properties?: {
            [k: string]: unknown;
        };
        /**
         * Additional information about the provided set's properties.
         */
        'properties-metadata'?: {
            overwritable?: boolean;
            optional?: boolean;
            datatype?: 'str' | 'int' | 'float' | 'bool';
            [k: string]: unknown;
        };
        [k: string]: unknown;
    }[];
    /**
     * A list of property sets provided by other modules and/or resources (providers) that this module requires.
     */
    requires?: {
        /**
         * The name of a provided property set or resource (provider) that this module requires.
         */
        name: string;
        /**
         * A "group" can be used to combine properties from multiple providers into one runtime lookup object, such as an environment variable. As of schema version 2.1, this property is DEPRECATED.
         */
        group?: string;
        /**
         * Defines a name for a runtime lookup object, such as an environment variable, if the required property set contains multiple values; for example, if used to consume configuration data from outside this MTA project.
         */
        list?: string;
        /**
         * Module properties whose values are determined by the provided properties. These properties can be referenced by the tilde notation: "~{<provided-property-name>}"
         */
        properties?: {
            [k: string]: unknown;
        };
        /**
         * Additional information about the modules's properties.
         */
        'properties-metadata'?: {
            overwritable?: boolean;
            optional?: boolean;
            datatype?: 'str' | 'int' | 'float' | 'bool';
            [k: string]: unknown;
        };
        /**
         * Configuration parameters that are used when deploying the module to the target runtime environment.
         */
        parameters?: {
            [k: string]: unknown;
        };
        /**
         * Additional information about the modules's parameters.
         */
        'parameters-metadata'?: {
            overwritable?: boolean;
            optional?: boolean;
            [k: string]: unknown;
        };
        /**
         * It is possible to define parameters in external files. The "includes" section is used to point to those files.
         */
        includes?: {
            /**
             * The name of an "includes" section. This name is used by a builder to generate a parameter section in the deployment descriptor.
             */
            name: string;
            /**
             * A path pointing to a file that contains a map of parameters, either in JSON or in YAML format.
             */
            path: string;
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    }[];
    [k: string]: unknown;
}

export interface MTAResource {
    /**
     * The resource name which must be unique and cannot be the same as any provided property set or module name.
     */
    name: string;
    /**
     * A type of resource supported by deployment tools in the target environment.
     */
    type?: string;
    /**
     * A free text describing this resource.
     */
    description?: string;
    /**
     * A collection of key-value pairs that can be required by modules and/or other resources as configuration data at runtime.
     */
    properties?: {
        [k: string]: unknown;
    };
    /**
     * Additional information about the resource's properties.
     */
    'properties-metadata'?: {
        overwritable?: boolean;
        optional?: boolean;
        datatype?: 'str' | 'int' | 'float' | 'bool';
        [k: string]: unknown;
    };
    /**
     * Configuration parameters that are used when provisioning the resource in the target runtime environment.
     */
    parameters?: {
        [k: string]: unknown;
    };
    /**
     * Additional information about the resource's parameters.
     */
    'parameters-metadata'?: {
        overwritable?: boolean;
        optional?: boolean;
        [k: string]: unknown;
    };
    /**
     * It is possible to define parameters in external files. The "includes" section is used to point to those files.
     */
    includes?: {
        /**
         * The name of an "includes" section. This name is used by a builder to generate a parameter section in the deployment descriptor.
         */
        name: string;
        /**
         * A path pointing to a file that contains a map of parameters, either in JSON or in YAML format.
         */
        path: string;
        [k: string]: unknown;
    }[];
    /**
     * If the resource is set to optional and the deployment tools are unable to allocate it, then the tools will issue a warning and continue the deployment process.
     */
    optional?: boolean;
    /**
     * A list containing the names of the resources that must be processed prior to this one.
     */
    'processed-after'?: string[];
    /**
     * If a resource is declared to be inactive, the resource will not be allocated during the deployment process.
     */
    active?: boolean;
    /**
     * A list of property sets provided by other modules and/or resources (providers) that this resource requires.
     */
    requires?: {
        /**
         * The name of a provided property set or resource (provider) that this resource requires.
         */
        name: string;
        /**
         * Resource properties whose values are determined by the provided properties. These properties can be referenced by the tilde notation: "~{<provided-property-name>}"
         */
        properties?: {
            [k: string]: unknown;
        };
        /**
         * Additional information about the required properties.
         */
        'properties-metadata'?: {
            overwritable?: boolean;
            optional?: boolean;
            datatype?: 'str' | 'int' | 'float' | 'bool';
            [k: string]: unknown;
        };
        /**
         * Configuration parameters that are used when provisioning the resource in the target runtime environment.
         */
        parameters?: {
            [k: string]: unknown;
        };
        /**
         * Additional information about the required parameters.
         */
        'parameters-metadata'?: {
            overwritable?: boolean;
            optional?: boolean;
            [k: string]: unknown;
        };
        /**
         * It is possible to define parameters in external files. The "includes" section is used to point to those files.
         */
        includes?: {
            /**
             * The name of an "includes" section. This name is used by a builder to generate a parameter section in the deployment descriptor.
             */
            name: string;
            /**
             * A path pointing to a file that contains a map of parameters, either in JSON or in YAML format.
             */
            path: string;
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    }[];
    [k: string]: unknown;
}
