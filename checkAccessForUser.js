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

var Access2Service_SNOW = Class.create();
Access2Service_SNOW.prototype = {
    initialize: function() {
    },
	
	checkAccess2Service: function(inputUser){
		var request = new sn_ws.RESTMessageV2();
		file_url = 'http://k2server.xyz.com/GetGroupsByUser?UserName='+inputUser;
		encodedURL = encodeURI(file_url);
		request.setEndpoint(encodedURL);		

		request.setHttpMethod('GET');
		request.setRequestHeader('Authorization','Basic abcdefgh'); // Basic auth : base64 encoded
		request.setRequestHeader("Accept","application/xml");
		request.setRequestHeader('Content-Type','application/xml');
		request.setMIDServer('SNOW_midserver');
		var response = request.execute();
		response.setHttpTimeout(10000);
		var XMLResponseBody =  response.getBody(); //this now holds the XML inside the envelope, as a string
		gs.log('Response : ' + XMLResponseBody);
		
		// Parsing the XML response from GET API Call
		var xmldoc = new XMLDocument(XMLResponseBody, true);
		var node = xmldoc.getNode("/one/two/y");
		gs.log('Node : ' + node.getNodeName());
		var nodelist = xmldoc.getNodes("//two/*");
		nodelistlength = nodelist.getLength();
		gs.log('Node Length : ' + nodelistlength);
		
		//gs.log('Node 0 : ' + nodelist.item(0).getNodeName());
		
		var lists = [];
		for (var i=0; i<nodelistlength; i++){
			if (nodelist.item(i).getNodeName()=="y")
				{
					lists.push(nodelist.item(i).getLastChild().getNodeValue());
				}
		}
		gs.log("List of Items : " + lists);
		
		var flag = 0;
		for (var j=0; j<lists.length; j++){
			if (lists[j]=='field2match') // This is the condition for checking whether a user has access or not
				{
					flag = 1;
					break;
				}
			else
				{
					flag = 0;
				}
		}
		if (flag == 1){
			gs.log("Access is already present");
		}
		else{
			gs.log("Access to service not present");
		}
		
	},

    type: 'Access2Service_SNOW'
};