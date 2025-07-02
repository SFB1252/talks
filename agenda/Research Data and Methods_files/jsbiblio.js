/* Bibliography module
 * It loads an EndNote xml export from the server, shows the list as Stanford
 * citations, allows to sort for author and year, search via words,
 * and export as EndNote xml.
 *
 * Copyright (C) 2017 Mattias Gaertner nc-gaertnma@netcologne.de
 *
 * This library is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Library General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Library General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Library General Public License
 * along with this library; if not, write to the Free Software Foundation,
 * Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 */

// needs jquery, tested with jquery 3.1.1
    
function createJSBibliography(listDivId,url)
// creates objBibl and if url is given loads data and shows page of bibliography
{
  var list = document.getElementById(listDivId);
  if (list == null){
    console.log('createJSBibliography: cannot find element "'+listDivId+'"');
    return null;
  }
  var objBibl = list.jsBibliography;
  if ((objBibl == null) || (objBibl.xmlurl != url)){
    objBibl = new jsBibliography(listDivId,url);
  } else {
    console.log('createJSBibliography: element "'+listDivId+'" has already a jsbibliography');
    return null;
  }
  //log('loadBibliography end');
  return objBibl;
}

function jsBiblCall(listDivId,fnname,args){
  var list = document.getElementById(listDivId);
  if (list == null){
    console.log('jsBiblCall: cannot find element "'+listDivId+'" for call "'+fnname+'"');
    return;
  }
  var objBibl = list.jsBibliography;
  if (objBibl==null){
    console.log('jsBiblCall: element "'+listDivId+'" is not a jsBibliography list');
    return;
  }
  if (objBibl.listDivId != listDivId){
    console.log('jsBiblCall: element "'+listDivId+'" is no longer a jsBibliography list');
    return;
  }
  if (typeof(objBibl[fnname])!=="function"){
    console.log('jsBiblCall: not a function: "'+fnname+'"');
    return;
  }
  if (!args){
    args = [];
  }
  objBibl[fnname].apply(objBibl,args);
}

function jsBibliography(listDivId,url){
  var objBibl = this;
  var list = document.getElementById(listDivId);
  list.jsBibliography = this;

  //log('jsBibliography init: url='+url);
  this.modulename = 'jsbiblio';
  this.xmlurl = '';
  this.listDivId = listDivId;

  this.resultsPerPage = 50;
  this.pageIndex = 0; // first page is 0

  this.biblStructs = []; // array of biblStruct
  this.idToBiblStruct = {};

  this.searchText = ''; // lowercase, trimmed of leading and trailing white spaces
  this.searchWords = []; // computed from searchText
  this.sortAuthor = null;// null, 'ascending' or 'descending'
  this.sortYear = 'descending'; // null, 'ascending' or 'descending'
  this.filterAuthor = '';
  this.filterAuthorWords = [];

  this.textInputId = null; // id of the input element of the filter words
  this.textInputTimer = null;

  this.sortAuthorId = null; // id of button for reverse sort by author
  this.sortYearId = null; // id of button for reverse sort by year

  // resource string:
  this.rsDefaultExportXML = 'GSSCPublications.xml';
  this.rsUnableToLoadBibliographyData = 'Unable to load bibliography data';
  this.rsExportSResultAs = 'Export %s results as ';
  this.rsNoMatchesFound = 'No matches found.';
  this.rsClickToDownloadTheEndNoteXML = 'Click to download the EndNote XML';
  this.rsGoToPreviousPage = 'Go to previous page';
  this.rsGoToNextPage = 'Go to next page';
  this.rsGoToPageS = 'Go to page %s';

  // public functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  this.load = function(url)
  {
    // load xml file
    //log('load '+url+' listDivId='+this.listDivId);
    this.xmlurl = url;
    getXML(url,this.rsUnableToLoadBibliographyData, onLoadedBibliography,this);
    return this;
  }

  this.show = function()
  {
    showBibliography(this);
    return this;
  }

  this.update = function()
  {
    lazyApplyFilter(this);
  }

  this.reverseSortAuthor = function()
  {
    // sort items by
    if (this.sortAuthor != 'ascending'){
      this.sortAuthor = 'ascending';
    } else {
      this.sortAuthor = 'descending';
    }
    this.sortYear = null;
    this.biblStructs.sort(compareBiblStructsByAuthor);
    if (this.biblStructs.length>0) showBibliography(this);
  }

  this.reverseSortYear = function()
  {
    if (this.sortYear != 'descending'){
      this.sortYear = 'descending';
    } else {
      this.sortYear = 'ascending';
    }
    this.sortAuthor = null;
    this.biblStructs.sort(compareBiblStructsByYear);
    if (this.biblStructs.length>0) showBibliography(this);
  }

  this.connectSortAuthor = function(inputId)
  {
    this.sortAuthorId = inputId;
    var input = document.getElementById(inputId);
    if (input==null){
      log('Warning: connectSortAuthor: "'+inputId+'" not found');
    };
    if (input.nodeName == 'A'){
      input.href = "javascript:jsBiblCall('"+this.listDivId+"','reverseSortAuthor')";
    } else {
      input.onclick = function() {
        //log('user clicked sort by author');
        objBibl.reverseSortAuthor();
      };
    }
    if (this.biblStructs.length>0) lazyApplyFilter(this);
    return this;
  }

  this.connectSortYear = function(inputId)
  {
    this.sortYearId = inputId;
    var input = document.getElementById(inputId);
    if (input==null){
      log('Warning: connectSortYear: "'+inputId+'" not found');
    };
    if (input.nodeName == 'A'){
      input.href = "javascript:jsBiblCall('"+this.listDivId+"','reverseSortYear')";
    } else {
      input.onclick = function() {
        //log('user clicked sort by year');
        objBibl.reverseSortYear();
      };
    }
    if (this.biblStructs.length>0) lazyApplyFilter(this);
    return this;
  }

  this.connectWordSearch = function(inputId)
  {
    this.textInputId = inputId;
    var input = document.getElementById(inputId);
    if (input==null){
      log('Warning: connectWordSearch: input "'+inputId+'" not found');
    };
    var bibl = this;
    input.oninput = function() {
      //log('user typed filter words');
      lazyApplyFilter(bibl);
    };
    if (this.biblStructs.length>0) lazyApplyFilter(this);
    return this;
  }

  this.setAuthorFilter = function(author)
  {
    author = removeDiacritical(author.trim().toLowerCase());
    if (this.filterAuthor==author) return(this);
    this.filterAuthor = author;
    this.filterAuthorWords = searchTxtToWords(author);
    if (this.biblStructs.length>0) lazyApplyFilter(this);
    return this;
  }

  this.gotoPage = function(newPageIndex){
    if (this.pageIndex==newPageIndex) return(this);
    this.pageIndex = newPageIndex;
    if (this.biblStructs.length>0) showBibliography(this);
  }

  this.exportXML = function(id){
    // save xml file
    var s = '<?xml version="1.0" encoding="UTF-8"?>'+"\n";
    s+="<xml>\n"
     +"<records>\n";
    if (isStringEmpty(id)){
      for(var i=0; i<this.biblStructs.length; i++){
        var bs = this.biblStructs[i];
        if (!bs.visible) continue;
        var xmlText = serializeXMLNode(bs.xmlNode);
        s+=xmlText+"\n";
      }
    } else {
      var bs = this.idToBiblStruct[id];
      var xmlText = serializeXMLNode(bs.xmlNode);
      s+=xmlText+"\n";
    }
    s+="</records>\n"
      +"</xml>\n";
    var blob = new Blob([s], {type: "text/xml;charset=utf-8"});
    saveAs(blob, this.rsDefaultExportXML);
  }

  if (!isStringEmpty(url)){
     this.load(url);
  }

// private utility functions - - - - - - - - - - - - - - - - - - - - - - - - - -
function log(msg) {
  console.log(msg);
}

function isStringEmpty(aString)
// returns true if aString contains no text
{
  return (aString === null) || (aString === undefined) || (aString.length === 0);
}

function fmt(rs,arg1)
{
  return rs.replace(/%s/,arg1);
}

function serializeXMLNode(xmlNode)
{
  if (typeof window.XMLSerializer != "undefined"){
    return (new window.XMLSerializer()).serializeToString(xmlNode);
  } else if (typeof xmlNode.xml != "undefined"){
    return xmlNode.xml;
  }
  return "";
}

function getXMLErrorMsg(xml)
// returns an error string if the xml document is an <error>
{
  if (xml === null) return 'empty xml';
  if (xml.documentElement === null) return 'xml has no root node';
  if (xml.documentElement.nodeName !== 'error') return null;
  var Msg = "";
  var childs = xml.documentElement.childNodes;
  for (var i = 0; i<childs.length; i++) {
    if (childs[i].nodeType == 3) {
      Msg = Msg + ' type=' + childs[i].nodeType + ' Value=' + childs[i].NodeValue;
    }
  }
  if (Msg === null) Msg = 'unknown exist error';
  return Msg;
}

function getXML(url, errormsg, onLoaded, sender)
// fetch a xml file from the server
// checks if xml is valid
// calls onLoaded(xml)
{
  if (!onLoaded) {
    alert('getXML: ' + errormsg + ' missing onLoadedXML');
  }

  var req = null;
  try {
    req = new XMLHttpRequest();
  } catch (ms) {
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (nonms) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        req = null;
      }
    }
  }

  if (req === null)
    alert("Error creating request object for url " + url);
  // open request (true = asynchron)
  //log('getXML url='+url+' listDivId='+sender.listDivId);
  req.open("GET", url, true);

  // on end:
  req.onreadystatechange = function() {
    //log('getXML onreadystatechange url='+url+' listDivId='+sender.listDivId+' req.readyState='+req.readyState);
    switch (req.readyState) {
      case 4: // Done
        if (req.status !== 200) {
          alert("Error: " + errormsg + ": url=" + url + " Status= " + req.status);
        } else {
          var xml = req.responseXML;
          if (xml === null) {
            log('Error: ' + errormsg + ': url=' + url + ' xml==null');
            return;
          }
          if (xml.documentElement === null) {
            log('Error: ' + errormsg + ': url=' + url + ' xml.documentElement==null');
            return;
          }
          //log('xml loaded');

          onLoaded(sender,xml);
        }
      break;
      default:
        return false;
    }
  };

  req.setRequestHeader("Content-Type",
    "application/x-www-form-urlencoded");
  req.send(null);
}

// parsing xml - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function onLoadedBibliography(bibl,xml)
// called after data has arrived
// reads EndNote and creates html
{
  //log('onLoadedBibliography START URL='+bibl.xmlurl+' listDivId='+listDivId);

  bibl.biblStructs = []; // array of biblStruct
  bibl.idToBiblStruct = {};

  var children = xml.documentElement.childNodes;
  for (var i = 0; i<children.length; i++){
  var node = children[i];
    if (node.nodeType != 1) continue;
  if (node.nodeName != 'records') continue;
    var records = node.children;
    var bsIndex = 0;
    for (var j = 0; j<records.length; j++)
  {
    var record = records[j];
      if (record.nodeType != 1) continue;
    if (record.nodeName != 'record') continue;
      var bs = readBiblStruct(bibl,record);
      bs.id = bs['rec-number'];
      if (isStringEmpty(bs.id)){
        log('Warning: invalid rec-number "'+bs['rec-number']+'"');
      } else if (bibl.idToBiblStruct[bs.id]!=null){
        log('Warning: duplicate rec-number "'+bs.id+'"')
      } else {
        bs.xmlpos = bsIndex;
        bsIndex+=1;
        bs.bibl = bibl;
        bibl.biblStructs.push(bs);
        bibl.idToBiblStruct[bs.id] = bs;
      }
    }
  }

  //sort biblStructs
  bibl.biblStructs.sort(compareBiblStructs);
  //log('onLoaded show');
  showBibliography(bibl);

  //log('onLoadedBibliography END');
}

function readBiblStruct(bibl,record)
// read EndNote record
{
  var bs = {};
  bs.xmlNode = record;
  bs.id = null;
  bs.visible = true;
  bs.allAuthors = [];
  bs.allText = [];
  bs.allLower = '';

  bs['rec-number'] = null;
  bs.authors = [];
  bs['secondary-authors'] = [];
  bs['tertiary-authors'] = [];
  bs['subsidiary-authors'] = [];
  bs.allAuthorsLower = [];
  bs.year = null;
  bs['related-urls'] = [];

  var nodes = record.children;
  for (var i = 0; i<nodes.length; i++){
  var node = nodes[i];
    if (node.nodeType != 1) continue;

    var nodeName = node.nodeName;
  if ((nodeName == 'rec-number')
     || (nodeName == 'ref-number')
     || (nodeName == 'pub-location')
     || (nodeName == 'publisher')
     || (nodeName == 'label')
     || (nodeName == 'pages')
     || (nodeName == 'edition')
     || (nodeName == 'isbn')
     || (nodeName == 'language')
     || (nodeName == 'number')
     || (nodeName == 'num-vols')
     || (nodeName == 'section')
     || (nodeName == 'volume')
     || (nodeName == 'electronic-resource-num') ){
      bs[nodeName] = node.textContent;
      //log('node '+nodeName+'='+bs[nodeName]);
    } else if (nodeName == 'ref-type'){
      bs[nodeName] = node.getAttribute('name');
    } else if (nodeName == 'contributors'){
      readContributors(node.children,bs);
    } else if (nodeName == 'titles'){
      readTitles(node.children,bs);
    } else if (nodeName == 'dates'){
      readDates(node.children,bs);
    } else if (nodeName == 'urls'){
      readURLs(node.children,bs);
    }
  }

  // delete nodes, not needed for export
  for (var i = nodes.length-1; i>=0; i--){
  var node = nodes[i];
    if (node.nodeType != 1) continue;
    var nodeName = node.nodeName;
    if (nodeName == 'database'){
    record.removeChild(node);
    }
  }

  bs.allLower=bs.authors.toString()+','+bs['secondary-authors'].toString()
    +','+bs['tertiary-authors'].toString()+','+bs['subsidiary-authors'].toString();
  bs.allLower+=' '+bs['title'];
              +' '+bs['secondary-title']+' '+bs['tertiary-title']
              +' '+bs['isbn']+' '+bs['year']+' '+bs['label']
              +' '+bs['publisher']+' '+bs['pub-location'];
  bs.allLower=removeDiacritical(bs.allLower.toLowerCase());

  // apply filter
  bs.visible = biblStructFits(bibl,bs);

  return bs;
}

function readContributors(nodes,biblStruct)
{
  //log('readContributors START');
  for (var i = 0; i<nodes.length; i++)
  {
  var node = nodes[i];
    if (node.nodeType != 1) continue;
  if ((node.nodeName == 'authors')
     || (node.nodeName == 'secondary-authors')
     || (node.nodeName == 'tertiary-authors')
     || (node.nodeName == 'subsidiary-authors')){
      //log('readContributors '+node.nodeName+' node.children.length='+node.children.length);
      for (var j = 0; j<node.children.length; j++){
      var subnode = node.children[j];
        if (subnode.nodeType != 1) continue;
      if (subnode.nodeName != 'author') continue;
        var author = subnode.textContent;
        if (isStringEmpty(author)) continue;
        //log('readContributors author "'+author+'"');
        biblStruct[node.nodeName].push(author);
        biblStruct.allAuthorsLower.push(removeDiacritical(author.trim().toLowerCase()));
      }
    }
  }
  //log('readContributors END');
}

function readTitles(nodes,biblStruct)
{
  //log('readTitles START');
  for (var i = 0; i<nodes.length; i++){
  var node = nodes[i];
  if ((node.nodeName == 'title')
     || (node.nodeName == 'secondary-title')
     || (node.nodeName == 'tertiary-title')){
      var title = node.textContent;
      if (isStringEmpty(title)) continue;
      //log('readTitles title "'+title+'"');
      biblStruct[node.nodeName] = title;
    }
  }
  //log('readTitles END');
}

function readDates(nodes,biblStruct)
{
  //log('readDates START');
  for (var i = 0; i<nodes.length; i++){
  var node = nodes[i];
  if (node.nodeName != 'year') continue;
    var year = node.textContent;
    if (isStringEmpty(year)) continue;
    //log('readDates year "'+year+'"');
    biblStruct.year = year;
  }
  //log('readDates END');
}

function readURLs(nodes,biblStruct)
{
  //log('readURLs START');
  for (var i = 0; i<nodes.length; i++){
  var node = nodes[i];
    if (node.nodeType != 1) continue;
  if (node.nodeName != 'related-urls') continue;
    for (var j = 0; j<node.children.length; j++){
    var subnode = node.children[j];
      if (subnode.nodeType != 1) continue;
    if (subnode.nodeName != 'url') continue;
      var url = subnode.textContent;
      if (isStringEmpty(url)) continue;
      biblStruct['related-urls'].push(url);
    }
  }
  //log('readURLs END');
}

// sort functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function compareBiblStructs(bs1,bs2)
{
  var result = 0;
  var bibl = bs1.bibl;
  result = compareBiblStructsByYear(bs1,bs2);
  if (result != 0) return result;
  result = compareBiblStructsByAuthor(bs1,bs2);
  if (result != 0) return result;
  if (bs1.xmlpos < bs2.xmlpos){
    result = 1;
  } else if (bs1.xmlpos > bs2.xmlpos) {
    result = -1;
  }

  return 0;
}

function compareBiblStructsByAuthor(bs1,bs2)
{
  var result = 0;
  var bibl = bs1.bibl;
  if ((bibl.sortAuthor == 'ascending') || (bibl.sortAuthor == 'descending')){
    // author
    var author1 = bs1.authors.toString();
    var author2 = bs2.authors.toString();
    if (author1 < author2){
      result = 1;
    } else if (author1 > author2) {
      result = -1;
    }
    if (bibl.sortAuthor == 'ascending') result = -result;
  }
  return result;
}

function compareBiblStructsByYear(bs1,bs2)
{
  var result = 0;
  var bibl = bs1.bibl;
  if ((bibl.sortYear == 'ascending') || (bibl.sortYear == 'descending')){
    // year
    var year1 = bs1.year;
    var year2 = bs2.year;
    if ((typeof year1 == 'number') && (typeof year2 == 'number')){
      if (year1!=year2)
        result = (year2-year1);
    } else {
      year1 = ''+year1;
      year2 = ''+year2;
      if (year1 < year2){
        result = 1;
      } else if (year1 > year2) {
        result = -1;
      }
    }
    if (bibl.sortYear == 'ascending') result = -result;
  }
  return result;
}

function compareCaseInsensitive(x, y)
{
  var a = String(x).toUpperCase();
  var b = String(y).toUpperCase();
  if (a > b)
    return 1;
  if (a < b)
  return -1;
  return 0;
}

function removeDiacritical(s)
// replace characters with diacritical chars with chars without diacriticals
{
  if (s === null) return null;
  var r = s;
  r = r.replace("–", "-"); // en-dash
  r = r.replace("—", "-"); // em-dash
  r = r.replace("ʾ", "");
  r = r.replace("ʿ", "");
  r = r.replace("÷", "/");
  r = r.replace("à", "a");
  r = r.replace("á", "a");
  r = r.replace("â", "a");
  r = r.replace("ã", "a");
  r = r.replace("å", "a");
  r = r.replace("æ", "a");
  r = r.replace("ç", "c");
  r = r.replace("č", "c");
  r = r.replace("ḍ", "d");
  r = r.replace("ḏ", "d");
  r = r.replace("è", "e");
  r = r.replace("é", "e");
  r = r.replace("ê", "e");
  r = r.replace("ë", "e");
  r = r.replace("ì", "i");
  r = r.replace("í", "i");
  r = r.replace("î", "i");
  r = r.replace("ï", "i");
  r = r.replace("ī", "i");
  r = r.replace("ḥ", "h");
  r = r.replace("ḫ", "h");
  r = r.replace("ǧ", "g");
  r = r.replace("ñ", "n");
  r = r.replace("ò", "o");
  r = r.replace("ó", "o");
  r = r.replace("ô", "o");
  r = r.replace("õ", "o");
  r = r.replace("õ", "o");
  r = r.replace("ø", "o");
  r = r.replace("ġ", "g");
  r = r.replace("ṣ", "s");
  r = r.replace("š", "s");
  r = r.replace("ṭ", "t");
  r = r.replace("ṯ", "t");
  r = r.replace("ū", "u");
  r = r.replace("ù", "u");
  r = r.replace("ú", "u");
  r = r.replace("ý", "y");
  r = r.replace("ÿ", "y");
  r = r.replace("ẓ", "z");

  return r;
}

function compareDiacriticalAndCaseInsensitive(x, y)
{
  var a = removeDiacritical(String(x).toLowerCase());
  var b = removeDiacritical(String(y).toLowerCase());
  if (a > b)
    return 1;
  if (a < b)
  return -1;
  return 0;
}

// filtering - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function lazyApplyFilter(bibl)
// called after the user typed a letter in the text search
{
  if (list.jsBibliography != bibl){
    log('Warning: lazyApplyFilter list.jsBibliography != bibl');
    return;
  }
  var textInput = document.getElementById(bibl.textInputId);
  if (textInput == null){
    log('Warning: lazyApplyFilter textInputId="'+bibl.textInputId+'" not found');
    return;
  }
  clearInputTimer(bibl);
  bibl.textInputTimer = setTimeout(function(){
      if (list.jsBibliography != bibl) return;
      clearInputTimer(bibl);
      var textInput = document.getElementById(bibl.textInputId);
      if (textInput == null) return;
      applyFilter(bibl);
      },200); // update after 200ms
}

function clearInputTimer(bibl)
{
  if(bibl.textInputTimer == null) return;
  clearTimeout(bibl.textInputTimer);
  bibl.textInputTimer = null;
}

function applyFilter(bibl)
// check all biblStructs if they fit the filter and show if needed
{
  var changed = false;
  var newSearchText = document.getElementById(bibl.textInputId).value+'';
  newSearchText = removeDiacritical(newSearchText.trim().toLowerCase());
  if (newSearchText != bibl.searchText){
    bibl.searchText = newSearchText;
    bibl.searchWords = searchTxtToWords(bibl.searchText);
    changed = true;
  }
  for (var i=0; i<bibl.biblStructs.length; i++){
    var bs = bibl.biblStructs[i];
    var fits =  biblStructFits(bibl,bs);
    if (bs.visible == fits) continue;
    bs.visible = fits;
    changed = true;
  }
  if(!changed) return;
  bibl.pageIndex = 0;
  showBibliography(bibl);
}

function biblStructFits(bibl,biblStruct)
// returns true if biblStruct fits current filter
{
  if (biblStruct['ref-type'].toLowerCase() == 'serial')
    return false; // workaround for wrong elements in xml

  if (bibl.filterAuthorWords.length>0){
    // all words must fit in one author
    var fits = false;
    for (var i=0; i<biblStruct.allAuthorsLower.length; i++){
      var author = biblStruct.allAuthorsLower[i];
      fits = true;
      for (var j=0; j<bibl.filterAuthorWords.length; j++){
        if (author.indexOf(bibl.filterAuthorWords[j])<0){
          fits = false;
          break;
        }
      }
      if (fits) break;
    }
    if (!fits) return false;
  }

  if (bibl.searchWords.length>0){
    // all words must fit
    for (var i=0; i<bibl.searchWords.length; i++){
      if (biblStruct.allLower.indexOf(bibl.searchWords[i])<0){
        //log('biblStructFits id="'+biblStruct.id+'" keyword "'+bibl.searchWords[i]+'" failed');
        return false;
      }
    }
  }
  //log('biblStructFits id="'+biblStruct.id+'" fits');
  return true;
}

function searchTxtToWords(txt)
{
  var words = [];
  if (isStringEmpty(txt)) return words;
  var p = 0;
  var startPos;
  while (p<txt.length){
    while ((p<txt.length) && (txt.charAt(p)==' ')) p++;
    if (p>=txt.length) break;
    if (txt.charAt(p)=='"'){
      // a phrase in quotes
      p++;
      startPos = p;
      while ((p<txt.length) && (txt.charAt(p)!='"')) p++;
    } else {
      // a word without qoutes
      startPos = p;
      while ((p<txt.length) && (txt.charAt(p)!=' ')) p++;
    }
    if (p>startPos){
      words.push(txt.substring(startPos,p));
    }
    p++;
  }
  return words;
}

// show item - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function showBibliography(bibl)
// create the HTML for the bibliography items
{
  //log('showBibliography START items='+bibl.biblStructs.length);
  var html = '';

  var visibleCount = 0;
  // make sure pageIndex is within range
  for (var i=0; i<bibl.biblStructs.length; i++){
    var biblStruct = bibl.biblStructs[i];
    if (!biblStruct.visible) continue;
    visibleCount+=1;
  }
  var maxPageIndex = 0;
  if (visibleCount>0) maxPageIndex = Math.floor((visibleCount-1)/bibl.resultsPerPage);
  //log('showBibliography pageIndex='+bibl.pageIndex+' maxPageIndex='+maxPageIndex+' visible='+visibleCount);
  if (bibl.pageIndex>maxPageIndex) bibl.pageIndex=maxPageIndex;

  if (visibleCount>0){
    // create export button
    html+='<div class="'+bibl.modulename+'-export">'+fmt(bibl.rsExportSResultAs,visibleCount)
    +' <span class="'+bibl.modulename+'-export-buttons">'
    +'<span class="'+bibl.modulename+'-xml '+bibl.modulename+'-export-item">'
    +'<a href="'+"javascript:jsBiblCall('"+bibl.listDivId+"','exportXML')"+'"'
      +' title="'+bibl.rsClickToDownloadTheEndNoteXML+'" rel="nofollow">XML</a>'
    +'</span>'
    +'</span></div>';
  } else {
    html+='<div class="'+bibl.modulename+'-export">'+bibl.rsNoMatchesFound+'</div>';
  }

  // show page
  var visibleIndex=0;
  for (var i=0; i<bibl.biblStructs.length; i++){
    var biblStruct = bibl.biblStructs[i];
    if (!biblStruct.visible) continue;
    if ((visibleIndex>=bibl.pageIndex*bibl.resultsPerPage)
    && (visibleIndex<(bibl.pageIndex+1)*bibl.resultsPerPage)){
      // visible item
      html+=createBiblStructHTML(bibl,biblStruct);
      //log('showBibliography i='+i+' id='+biblStruct.id+' html='+html.length);
    }
    visibleIndex+=1;
  }
  //log('showBibliography visible='+visibleIndex);

  if (maxPageIndex>0){
    // create page links
    html+='<div class="'+bibl.modulename+'-item-list uzk15__paginator"><ul class="'+bibl.modulename+'-pager">';
    if (bibl.pageIndex>0){
      html+='<li class="'+bibl.modulename+'-pager-previous">'
        +'<a title="'+bibl.rsGoToPreviousPage+'"'
        +' href="'+"javascript:jsBiblCall('"+bibl.listDivId+"','gotoPage',["+(bibl.pageIndex-1)+'])">'
        +'‹ previous</a></li>';
    }
    for (var i=0; i<=maxPageIndex; i++){
      var li='';
      if (i==bibl.pageIndex){
        li+='<li class="'+bibl.modulename+'-pager-current"><strong>'+(i+1)+'</strong></li>';
      } else {
        li+='<li class="'+bibl.modulename+'-pager-item">'
          +'<a title="'+fmt(bibl.rsGoToPageS,i+1)+'"'
          +' href="'+"javascript:jsBiblCall('"+bibl.listDivId+"','gotoPage',["+i+'])">'+(i+1)+'</a></li>';
      }
      html+=li;
    }
    if (bibl.pageIndex<maxPageIndex){
      html+='<li class="'+bibl.modulename+'-pager-next">'
        +'<a title="'+bibl.rsGoToNextPage+'"'
        +' href="'+"javascript:jsBiblCall('"+bibl.listDivId+"','gotoPage',["+(bibl.pageIndex+1)+'])">'
        +'next ›</a></li>';
    }
    html+='</ul></div>';
  }

  var div = document.getElementById(bibl.listDivId);
  div.innerHTML = html;

  //log('showBibliography END '+bibl.biblStructs.length);
}

function abbreviateForeNames(forenames)
// example: Charles E. -> C.E.
{
  forenames = forenames.trim();
  var re = /([^ .])([^ .]+ *)/g;
  return forenames.replace(re,'$1.');
}

function getFirstInitial(names)
// example: Charles E. -> C.
{
  names = names.trim();
  return names.substring(0,1)+'.';
}

function authorAsLastNameCommaFirstInitial(author)
// example: Hensel, Silke -> Hensel, S.
{
  author = author.trim();
  var i = author.indexOf(',');
  if (i>=0){
    // e.g. Hensel, Silke
    var lastname = author.substring(0,i).trim();
    var forename = author.substring(i+1).trim();
    return lastname+', '+getFirstInitial(forename);
  } else {
    var i = author.lastIndexOf(' ');
    if (i>=0){
      // .e.g Silke Hensel
      var lastname = author.substring(0,i).trim();
      var forename = author.substring(i+1).trim();
      return lastname+', '+getFirstInitial(forename);
    } else {
      // e.g. 'Rushd'
      return author;
    }
  }
}

function authorAsFirstInitialPointLastName(author)
// example: Hensel, Silke -> S. Hensel
{
  author = author.trim();
  var i = author.indexOf(',');
  if (i>=0){
    // e.g. Hensel, Silke
    var lastname = author.substring(0,i).trim();
    var forename = author.substring(i+1).trim();
    return getFirstInitial(forename)+' '+lastname;
  } else {
    var i = author.lastIndexOf(' ');
    if (i>=0){
      // .e.g Silke Hensel
      var lastname = author.substring(0,i).trim();
      var forename = author.substring(i+1).trim();
      return getFirstInitial(forename)+' '+lastname;
    } else {
      // e.g. 'Rushd'
      return author;
    }
  }
}

function createAuthorsHTML(bibl,authors)
// last name, first initial and last name, first initial.
{
  var html = '';
  for(var i=0; i<authors.length;i++){
    if (i>0){
      if(i==authors.length-1){
        html+=' and ';
      } else{
        html+=', ';
      }
    }
    html += authorAsLastNameCommaFirstInitial(authors[i]);
  }
  return '<span class="'+bibl.modulename+'-authors"><strong>'+html+'</strong></span>';
}

function createInAuthorsHTML(bibl,authors)
// first initial. last name, ed.
{
  var html = '';
  for(var i=0; i<authors.length;i++){
    if (i>0){
      if(i==authors.length-1){
        html+=' and ';
      } else{
        html+=', ';
      }
    }
    html += authorAsFirstInitialPointLastName(authors[i]);
  }
  return '<span class="'+bibl.modulename+'-authors"><strong>'+html+'</strong></span>';
}

function createAvailableAtHTML(urls)
// Available at: url.
{
  var html = '';
  if (urls.length == 0) return html;
  for(var i=0; i<urls.length; i++){
    if (i==0){
      html += ' Available at: ';
    } else {
      html += ', ';
    }
    html+='<a href="'+urls[i]+'" target="_blank">URL</a>';
  }
  html+='.';
  return html;
}

function createTitle(bibl,title,italic)
{
  var s = '<span class="'+bibl.modulename+'-entry-title';
  if(italic)
    s+=' '+bibl.modulename+'-entry-italic';
  s+='">'+title+'</span>';
  return s;
}

function createPublished(bibl,biblStruct,prefix)
{
  var s = '';
  if (!isStringEmpty(biblStruct['pub-location']))
    s += ' '+biblStruct['pub-location'];
  if (!isStringEmpty(biblStruct['publisher'])){
    if (!isStringEmpty(biblStruct['pub-location'])) s+=':';
    s += ' '+biblStruct['publisher'];
  }
  if (isStringEmpty(s)) return s;
  return prefix+s;
}

function createBiblStructHTML(bibl,biblStruct)
// create div for the bibliography item
{
  var refType = biblStruct['ref-type'].toLowerCase();
  var author = biblStruct['authors'][0];
  var title = biblStruct['title'];
  var secAuthors = biblStruct['secondary-authors'];

  var html = '<p class="'+bibl.modulename+'-entry" id="'+bibl.modulename+'-'+biblStruct.id+'">';

  if (refType == 'book section'){
    // Harvey, S. (2003), ”Arabic into Hebrew: The Hebrew Translation Movement and
    // the Influence of Averroes upon Medieval Jewish Thought“, in: D.H. Frank and O.
    // Leaman eds, The Cambridge Companion to Medieval Jewish Philosophy, Cambridge:
    // Cambridge University Press, 258–280.
    html += createAuthorsHTML(bibl,biblStruct.authors);
    html += ' ('+biblStruct.year+')';
    html += ', '+createTitle(bibl,'"'+biblStruct.title+'"');
    if(secAuthors.length==1){
      html+=' in: '+authorAsFirstInitialPointLastName(secAuthors[0])+' ed.';
    } else if (secAuthors.length>1){
      for(var i=0; i<secAuthors.length;i++){
        if (i==0){
          html+=' in: ';
        } else if (i<secAuthors.length-1){
          html+=', ';
        } else {
          html+=' and ';
        }
        html+=authorAsFirstInitialPointLastName(secAuthors[i]);
      }
      html+=', eds';
    }
    html += '<em>';
    var secTitle = biblStruct['secondary-title'];
    if (!isStringEmpty(secTitle))
      html += ', '+createTitle(bibl,secTitle,true)
    html += '.';
    if (!isStringEmpty(biblStruct['tertiary-title']))
      html += ' '+createTitle(bibl,biblStruct['tertiary-title'],true)+'.';
    if (!isStringEmpty(biblStruct['edition']))
      html += ' '+biblStruct['edition']+' ed.';
    var vol = biblStruct['volume'];
    var num = biblStruct['number'];
    if(!isStringEmpty(vol))
      html += ' '+vol;
    if(!isStringEmpty(num))
      html += ' '+num;
    var issue = biblStruct['issue'];
    if(!isStringEmpty(issue)) html += '.'+issue;
    html += createPublished(bibl,biblStruct,'');
    if (!isStringEmpty(biblStruct['pages']))
      html += ', '+biblStruct['pages'];
    html += '.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else if(refType == 'book'){
    // Eichner, H. (2005), Averroes. Mittlerer Kommentar zu Aristoteles' De generatione et
    // corruptione, Paderborn: Schöningh.
    html += createAuthorsHTML(bibl,biblStruct.authors);
    html += ' ('+biblStruct.year+')';
    html += ', '+createTitle(bibl,biblStruct.title,true);
    html += '<em>';
    var secTitle = biblStruct['secondary-title'];
    if (!isStringEmpty(secTitle)) html += ', '+createTitle(bibl,secTitle,true);
    if (biblStruct['secondary-authors'].length>0)
      html += ' '+createInAuthorsHTML(bibl,biblStruct['secondary-authors']);
    var vol = biblStruct['volume'];
    var num = biblStruct['number'];
    if(!isStringEmpty(vol))
      html += ' '+vol;
    if(!isStringEmpty(num))
      html += ' '+num;
    var issue = biblStruct['issue'];
    if(!isStringEmpty(issue)) html += '.'+issue;

    html += createPublished(bibl,biblStruct,',');
    html += '.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else if(refType == 'edited book'){
    // Last name, First Initial, (ed.|eds.) Year. Title, PubLocation: Publisher.
    html += createAuthorsHTML(bibl,biblStruct.authors);
    if (biblStruct.authors.length==1){
      html += ' (ed.)';
    } else {
      html += ' (eds.)';
    }
    html += ' '+biblStruct.year+'.';
    html += ' '+createTitle(bibl,biblStruct.title);
    
    html += '<em>';
    if (isStringEmpty(biblStruct['edition'])){
      html += ', 1st ed.';
    } else {
      html += biblStruct['edition']+', ed.';
    }

    var vol = biblStruct['volume'];
    var num = biblStruct['number'];
    if(!isStringEmpty(vol))
      html += ' '+vol;
    if(!isStringEmpty(num))
      html += ' '+num;
    var issue = biblStruct['issue'];
    if(!isStringEmpty(issue)) html += '.'+issue;

    html += createPublished(bibl,biblStruct,',');
    if (!isStringEmpty(biblStruct['pages']))
      html += ', pp. '+biblStruct['pages'];
    html += '.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else if(refType == 'article'){
    // Bertolacci, A. (2007), ”Avicenna and Averroes on the Proof of God’s Existence and
    // the Subject-Matter of Metaphysics“, Medioevo, 32: 61–97.
    html += createAuthorsHTML(bibl,biblStruct.authors);
    html += ' ('+biblStruct.year+')';
    html += ', '+createTitle(bibl,'"'+biblStruct.title+'"');
    html += '<em>';
    if(!isStringEmpty(biblStruct['secondary-title']))
      html += createTitle(bibl,biblStruct['secondary-title'],true)+',';
    var vol = biblStruct['volume'];
    var num = biblStruct['number'];
    if(!isStringEmpty(vol))
      html += ' '+vol;
    if(!isStringEmpty(num))
      html += ' '+num;
    var issue = biblStruct['issue'];
    if(!isStringEmpty(issue)) html += '.'+issue;
    html += ' '+biblStruct['pages']+'.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else if(refType == 'journal article'){
    // Ross, N. (2015). On Truth Content and False Consciousness in
    // Adorno’s Aesthetic Theory. Philosophy Today, 59(2), pp. 269-290.
    html += createAuthorsHTML(bibl,biblStruct.authors);
    html += ' ('+biblStruct.year+').';
    html += ' '+createTitle(bibl,biblStruct.title)+'.';
    html += '<em>';
    if(!isStringEmpty(biblStruct['secondary-title']))
      html += ' '+createTitle(bibl,biblStruct['secondary-title'],true)+',';
    var vol = biblStruct['volume'];
    if(!isStringEmpty(vol))
      html += ' '+vol;
    var num = biblStruct['number'];
    if(!isStringEmpty(num))
      html += '('+num+')';
    if (!isStringEmpty(biblStruct['edition']))
      html += ' '+biblStruct['edition']+' ed.';
    if (!isStringEmpty(biblStruct['pages']))
      html += ', pp. '+biblStruct['pages'];
    html += '.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else if(refType == 'report'){
    // Certify, (2015). First Quarter, 2015 Business Expense Trends.
    // [online] Portland: Certify, p.2. Available at:
    // http://www.certify.com/CertifySpendSmartReport.aspx [Accessed 8 Apr. 2015].
    html += createAuthorsHTML(bibl,biblStruct.authors);
    html += ' ('+biblStruct.year+').';
    html += ' '+createTitle(bibl,biblStruct.title,true)+'.';
    html += '<em>';
    if (biblStruct['related-urls'].length>0)
      html += '[online]';
    if(!isStringEmpty(biblStruct['secondary-title']))
      html += ' '+createTitle(bibl,biblStruct['secondary-title'],true);
    var vol = biblStruct['volume'];
    if(!isStringEmpty(vol))
      html += ' '+vol;
    var num = biblStruct['number'];
    if(!isStringEmpty(num))
      html += '('+num+')';
    html += createPublished(bibl,biblStruct,',');
    if (!isStringEmpty(biblStruct['pages']))
      html += ' '+biblStruct['pages'];
    html += '.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else if(refType == 'conference paper'){
    // Palmer, L., Gover, E. and Doublet, K. (2013). Advocating for Your
    // Tech Program. In: National Conference for Technology
    // Teachers. [online] New York: NCTT, pp. 33-34. Available at:
    // http://www.nctt.com/2013conference/advocatingforyourtechprogram/
    // [Accessed 11 Jan. 2014].
    html += createAuthorsHTML(bibl,biblStruct.authors);
    html += ' ('+biblStruct.year+').';
    html += ' '+createTitle(bibl,biblStruct.title)+'.';
    html += '<em>';
    if(!isStringEmpty(biblStruct['secondary-title']))
      html += ' In: '+createTitle(bibl,biblStruct['secondary-title'],true)+'.';
    html += createPublished(bibl,biblStruct,'');
    if (!isStringEmpty(biblStruct['pages']))
      html += ', '+biblStruct['pages'];
    html += '.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else if(refType == 'web page'){
    // Messer, L. (2015). 'Fancy Nancy' Optioned by Disney Junior.
    // [online] ABC News. Available at:
    // http://abcnews.go.com/Entertainment/fancy-nancy-optioned-disney-junior-2017/story?id=29942496#.VRWbWJwmbs0.twitter
    // [Accessed 31 Mar. 2015].
    html += createAuthorsHTML(bibl,biblStruct.authors);
    html += ' ('+biblStruct.year+').';
    html += ' '+createTitle(bibl,biblStruct.title,true)+'. [online]';
    html += '<em>';
    if(!isStringEmpty(biblStruct['secondary-title']))
      html += ' '+createTitle(bibl,biblStruct['secondary-title'])+'.';
    html += createPublished(bibl,biblStruct,'');
    html += '.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else if(refType == 'blog'){
    // Cohen, M. (2013). Re-election Is Likely for McConnell, but Not
    // Guaranteed. [Blog] FiveThirtyEight. Available at:
    // http://fivethirtyeight.blogs.nytimes.com/2013/07/01/re-election-is-likely-for-mcconnell-but-not-guaranteed/
    // [Accessed 4 Apr. 2015].
    html += createAuthorsHTML(bibl,biblStruct.authors);
    html += ' ('+biblStruct.year+').';
    html += ' '+createTitle(bibl,biblStruct.title,true)+'. [Blog]';
    html += '<em>';
    if(!isStringEmpty(biblStruct['secondary-title']))
      html += ' '+createTitle(bibl,biblStruct['secondary-title'])+'.';
    html += createPublished(bibl,biblStruct,'');
    html += '.';
    html += createAvailableAtHTML(biblStruct['related-urls']);
    html += '</em>';

  } else {
    // default: show some info
    html += '[reftype='+refType+',rec-number='+biblStruct['rec-number']+']';
    html += createAuthorsHTML(bibl,biblStruct.authors);
    if (biblStruct['secondary-authors'].length>0)
      html += 'secondary-authors: '+createAuthorsHTML(bibl,biblStruct['secondary-authors']);
    if (biblStruct['tertiary-authors'].length>0)
      html += 'tertiary-authors: '+createAuthorsHTML(bibl,biblStruct['tertiary-authors']);
    if (biblStruct['subsidiary-authors'].length>0)
      html += 'subsidiary-authors: '+createAuthorsHTML(bibl,biblStruct['subsidiary-authors']);
    html += ' ('+biblStruct.year+')';
    html += ', '+createTitle(bibl,'"'+biblStruct.title+'"');
    if(!isStringEmpty(biblStruct['secondary-title']))
      html += ' '+createTitle(bibl,biblStruct['secondary-title'],true)+',';
    if(!isStringEmpty(biblStruct['tertiary-title']))
      html += ' '+createTitle(bibl,biblStruct['tertiary-title'],true)+',';
    var vol = biblStruct['volume'];
    var num = biblStruct['number'];
    if(!isStringEmpty(vol)){
      html += ' '+vol;
    }else if(!isStringEmpty(num)){
      html += ' '+num;
    }
    var issue = biblStruct['issue'];
    if(!isStringEmpty(issue)) html += '.'+issue;
    html += ' '+biblStruct['pages']+'.';
    html += createPublished(bibl,biblStruct,',');
    if (!isStringEmpty(biblStruct['label'])) html+=',label='+biblStruct['label'];
    if (!isStringEmpty(biblStruct['isbn'])) html+=',isbn='+biblStruct['isbn'];
    if (!isStringEmpty(biblStruct['edition'])) html+=',edition='+biblStruct['edition'];
    if (!isStringEmpty(biblStruct['language'])) html+=',language='+biblStruct['language'];
    if (!isStringEmpty(biblStruct['num-vols'])) html+=',num-vols='+biblStruct['num-vols'];
    // related-urls
    if (!isStringEmpty(biblStruct['section'])) html+=',section='+biblStruct['section'];
  }

  html+=' <a href="'+"javascript:jsBiblCall('"+bibl.listDivId+"','exportXML',['"+biblStruct.id+"']"+')">XML</a>';

  html+='</p>';
  return html;
}

}  // end of function jsBibliography


