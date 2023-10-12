// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from './_framework/dotnet.js'

const { setModuleImports, getAssemblyExports, getConfig } = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

setModuleImports('main.js', {
    window: {
        location: {
            href: () => globalThis.window.location.href
        },
        editor: {
            setError: (err) => {           
                let errorList = document.getElementById('error-tbody')
                let p = document.createElement('p');
                p.innerText = err;
                errorList.appendChild(p);
            },
            clearError: () => {
                let errorList = document.getElementById('error-tbody')
                errorList.replaceChildren();
            }
        }
    }
});

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);
window.interop = exports;