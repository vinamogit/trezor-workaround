/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library","./CoreHelper.support","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(e,r,o){"use strict";var t=sap.ui.require("sap/base/Log");if(!t){t=o.sap.log}var n=e.Categories;var i=e.Severity;var s=e.Audiences;var a={id:"errorLogs",audiences:[s.Control,s.Internal],categories:[n.Performance],enabled:true,minversion:"1.32",title:"Error logs",description:"Checks for the amount of error logs in the console",resolution:"Error logs should be fixed",resolutionurls:[],check:function(e,r){var o=0,n="";var s=t.getLogEntries();s.forEach(function(e){if(e.level===t.Level.ERROR){o++;if(o<=20){n+="- "+e.message+"\n"}}});if(o>0){e.addIssue({severity:i.Low,details:"Total error logs: "+o+"\n"+n,context:{id:"WEBPAGE"}})}}};var d={id:"eventBusSilentPublish",audiences:[s.Internal],categories:[n.Functionality],enabled:true,minversion:"1.32",title:"EventBus publish",description:"Checks the EventBus publications for missing listeners",resolution:"Calls to EventBus#publish should be removed or adapted such that associated listeners are found",resolutionurls:[],check:function(e,r){var o=t.getLogEntries();var n=[];o.forEach(function(e){if(e.component==="sap.ui.core.EventBus"){if(e.details&&e.details.indexOf("sap.")!==0){if(n.indexOf(e.message)===-1){n.push(e.message)}}}});n.forEach(function(r){e.addIssue({severity:i.Low,details:"EventBus publish without listeners "+r,context:{id:"WEBPAGE"}})})}};var u={id:"embeddedByLibNotLoaded",audiences:[s.Application],categories:[n.Performance],enabled:true,minversion:"1.97",title:"Embedding Component or Library not loaded",description:"Checks if the corresponding Component or Library of a Component is already loaded in case the Component is embedded by a resource.",resolution:"Before using a Component embedded by a Library or another Component, it's necessary to load the embedding Library or Component in advance. "+"The 'sap.app/embeddedBy' property must be relative path inside the deployment unit (library or component).",resolutionurls:[],check:function(e){var r={},o;var n=function(e){return function(r){return r.getManifestObject().getEntry("/sap.app/id")===e}};var s=function(r){return function(o){e.addIssue({severity:i.High,details:r.message,context:{id:o.getId()}})}};t.getLogEntries().forEach(function(e){var o=/^Component '([a-zA-Z0-9\.]*)'.*$/;if(e.component==="sap.ui.core.Component#embeddedBy"){r[o.exec(e.message)[1]]=e}});for(o in r){if(Object.hasOwnProperty.call(r,o)){var a=sap.ui.core.Component.registry.filter(n(o));a.forEach(s(r[o]))}}}};return[d,a,u]},true);