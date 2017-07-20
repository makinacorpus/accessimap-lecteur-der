export const load = file => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file);
    xhr.send('');
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.error);
      }
    };
  });
}

export const getFileObject = (filePathOrUrl, cb) => {
  var getFileBlob = function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.addEventListener('load', function() {
      cb(xhr.response);
    });
    xhr.send();
  };

  var blobToFile = function (blob, name) {
    blob.lastModifiedDate = new Date();
    blob.name = name;
    return blob;
  };
  return getFileBlob(filePathOrUrl, function (blob) {
    cb(blobToFile(blob, 'test.jpg'));
  });
}

export const parseXml = xmlStr => {
  if (typeof window.DOMParser != 'undefined') {
    return ( new window.DOMParser() ).parseFromString(xmlStr, 'text/xml');
  } else {
    throw new Error('No XML parser found');
  }
}

// Changes XML to JSON
export const XML2jsobj = (node) => {

  var	data = {};

  // append a value
  function Add(name, value) {
    if (data[name]) {
      if (data[name].constructor != Array) {
        data[name] = [data[name]];
      }
      data[name][data[name].length] = value;
    }
    else {
      data[name] = value;
    }
  }

  // element attributes
  var c, cn;
  for (c = 0; cn = node.attributes[c]; c++) {
    Add(cn.name, cn.value);
  }

  // child elements
  for (c = 0; cn = node.childNodes[c]; c++) {
    if (cn.nodeType == 1) {
      if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
        // text value
        Add(cn.nodeName, cn.firstChild.nodeValue);
      }
      else {
        // sub-object
        Add(cn.nodeName, XML2jsobj(cn));
      }
    }
  }
  return data;
}

export const orderFilesByExt = (files) => {
  var filesByExt = {
    xml: [],
    svg: [],
    audioFiles: {} // ZipObjects of audio files
  };

  for (var file in files) {
    var ext = file.split('.').pop();

    if(files[file].dir === true) {
      filesByExt.dirName = files[file].name;
    }

    if (ext === 'xml') {
      filesByExt.xml.push(files[file]);
    }

    if (ext === 'svg') {
      filesByExt.svg.push(files[file]);
    }

    if (ext === 'mp3') {
      let name = filesByExt.dirName ? files[file].name.replace(filesByExt.dirName, '') : files[file].name;
      filesByExt.audioFiles[name] = files[file];
    }
  }

  return filesByExt;
}