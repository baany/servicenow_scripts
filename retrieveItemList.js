/*			XML Response type :
			<one>
				<two>
					<x>1234</x>
					<y>12abc</y>
					<z>abcd</z>
				</two>
				<three></three>
			</one>
*/

var ItemList_SNOW = Class.create();
ItemList_SNOW.prototype = {
    initialize: function() {
    },
	
	getItemList: function(softname){
		var request = new sn_ws.RESTMessageV2();
		request.setEndpoint('http://k2server.xyz.com/GetAvailableAppsByCountry?CountryCode=IN');
		request.setHttpMethod('GET');
		request.setRequestHeader('Authorization','Basic abcdefgh'); // Basic auth : base64 encoded
		request.setRequestHeader("Accept","application/xml");
		request.setRequestHeader('Content-Type','application/xml');
		request.setMIDServer('SNOW_midserver');
		var response = request.execute();
		response.setHttpTimeout(10000);
		var XMLResponseBody =  response.getBody();//this now holds the XML inside the envelope, as a string
		gs.log('Response : ' + XMLResponseBody);
		
		// Parsing the XML response from GET API Call
		var xmldoc = new XMLDocument(XMLResponseBody, true);
		var node = xmldoc.getNode("/one/two/x");
		gs.log('Node : ' + node.getNodeName());
		var nodelist = xmldoc.getNodes("//two/*");
		nodelistlength = nodelist.getLength();
		gs.log('Node Length : ' + nodelistlength);
		
		// gs.log('Node 0 : ' + nodelist.item(0).getNodeName());
		
		var lists = [];
		for (var i=0; i<nodelistlength; i++){
			if (nodelist.item(i).getNodeName()=="x")
				{
					lists.push(nodelist.item(i).getLastChild().getNodeValue());
				}
		}
		gs.log("List of Items : " + lists);
		gs.log("Length - Item List : " + lists.length);
		
		var itemListMatched = [];
		for(i=0;i<lists.length;i++){
			if(lists[i].indexOf(softname) > -1)
				itemListMatched.push(lists[i]);
		}
		gs.log("Final ItemList: " + itemListMatched);		
	},
	
	type: 'ItemList_SNOW'
};