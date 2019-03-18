var punchTimeSheets = artifacts.require("PunchTimeSheets");
var crypto = require("crypto");
const tryCatch = require("./exceptions.helper.js").tryCatch;
let errTypes = require("./exceptions.helper.js").errTypes;

contract("PunchTimeSheets", async (accounts) => {
    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
    

    it('should add an new address', async () => {
        const instance = await punchTimeSheets.deployed();       

        const _clientAddress = accounts[2];        
        let success = await instance.whiteListClient(_clientAddress);
        expect(success).to.not.be.null;
        
    });

    it('It should add new addresses', async() => {
        const instance = await punchTimeSheets.deployed();
        
        const _clientAddress = accounts[2];        
        let success = await instance.whiteListClient(_clientAddress);        

        const _clientAddress3 = accounts[3];        
        success = await instance.whiteListClient(_clientAddress3);
        expect(success).to.not.be.null;
    })

    it("Should not add a contract adddress", async () => {
        const instance = await punchTimeSheets.deployed();
       // console.log(instance.address);
        try {
            let ifShouldFail = await instance.whiteListClient(instance.address);    
        } catch (error) {
            //console.log(error);
            expect(error).to.not.be.null;
        }
    });

    it('should add then remove address', async() => {
        const instance = await punchTimeSheets.deployed();

        const _clientAddress4 = accounts[4];
        let success = await instance.whiteListClient(_clientAddress4);
        expect(success).to.not.be.null;
       // console.log(success);

        success = await instance.deWhiteListClient(_clientAddress4);
        //console.log(success);
    });

    it('should not allow the same address for both participants', async() => {
        const instance = await punchTimeSheets.deployed();
        const _clientAddress3 = accounts[3];        
        let encryptedTimeSheet = "GARBAGE";
        await tryCatch(instance.addTimeSheet(_clientAddress3, _clientAddress3, encryptedTimeSheet), errTypes.revert);
    }) 

    it('should not allow an empty string for submitted timesheets', async() => {
        const instance = await punchTimeSheets.deployed();
        const _clientAddress3 = accounts[3];
        const _clientAddress4 = accounts[4];        
        const emptyString = "";

        await tryCatch(instance.addTimeSheet(_clientAddress3, _clientAddress4, emptyString), errTypes.revert);
    }) 

    it('should add a submitted contract with two valid white listed address', async() => {
        const algorithm = 'aes-256-ctr';
        let p = 'd6F3Efeq';

        let submittedTimeSheet =  {
            "id":1,
            "agencyid":1,
            "clientid":1,
            "contractorid":1,            
            "totals":[
                       {
                           "projectCode":123456,                        
                           "standardTime":20                           
                       },{
                           "projectCode":654321,                           
                           "standardTime":16.0                           
                       },
                       {
                           "projectCode":231456,                           
                           "standardTime":2.0                           
                       }
                   ]
           }
        //https://ethereum.stackexchange.com/questions/11926/how-to-return-a-mapping-type
        const ts = JSON.stringify(submittedTimeSheet);
       // console.log(ts);
        
        var cipher = crypto.createCipher(algorithm,p)
        var encryptedTimeSheet = cipher.update(ts,'utf8','hex')
        encryptedTimeSheet += cipher.final('hex');

        const instance = await punchTimeSheets.deployed();

        const _clientAddress3 = accounts[3];
        let success = await instance.whiteListClient(_clientAddress3);
        console.log(success);

        const _clientAddress4 = accounts[4];
        success = await instance.whiteListClient(_clientAddress4);
        console.log(success);
       // console.log(encryptedTimeSheet.length);
        //console.log(encryptedTimeSheet);
        success = await instance.addTimeSheet(_clientAddress3, _clientAddress4, encryptedTimeSheet);
        console.log(success);

        var decipher = crypto.createDecipher(algorithm,p)

        //let tss = await instance.getSubmittedTimeSheetsByParticipants(_clientAddress3, _clientAddress4);
        /*
        let tss = await instance.getSubmittedTimeSheet(_clientAddress3, _clientAddress4); 
        console.log(tss);
        let dec = decipher.update(tss,'hex','utf8')
        dec += decipher.final('utf8');
        console.log(dec);
        let result = JSON.parse(dec);      
        console.log(result);  
        */
    });

    it('Should add two submitted timeshseets with two valid white listed address', async () =>{
        const algorithm = 'aes-256-ctr';
        let p = 'd6F3Efeq';

        let submittedTimeSheet =  {
            "id":1,
            "agencyid":1,
            "clientid":1,
            "contractorid":1,
            "sow":1,
            "totals":[
                       {
                           "projectCode":123456,
                           "projectId":1,
                           "standardTime":20,
                           "overTime":0.0,
                           "doubleTime":0.0
                       
                       },{
                           "projectCode":654321,
                           "projectId":2,
                           "standardTime":16.0,
                           "overTime":2.0,
                           "doubleTime":0.0                       
                       },
                       {
                           "projectCode":231456,
                           "projectId":2,
                           "standardTime":2.0,
                           "overTime":0.0,
                           "doubleTime":0.0
                       }
                   ]
           }
        //https://ethereum.stackexchange.com/questions/11926/how-to-return-a-mapping-type
        const ts = JSON.stringify(submittedTimeSheet);
       // console.log(ts);
        
        var cipher = crypto.createCipher(algorithm,p)
        var encryptedTimeSheet = cipher.update(ts,'utf8','hex')
        encryptedTimeSheet += cipher.final('hex');

        const instance = await punchTimeSheets.deployed();

        const _clientAddress2 = accounts[2];
        let success = await instance.whiteListClient(_clientAddress2);

        const _clientAddress3 = accounts[3];
        success = await instance.whiteListClient(_clientAddress3);
       // console.log(success);

        const _clientAddress4 = accounts[4];
        success = await instance.whiteListClient(_clientAddress4);

        const _clientAddress5 = accounts[5];
        success = await instance.whiteListClient(_clientAddress5);
        
        success = await instance.addTimeSheet(_clientAddress3, _clientAddress4, encryptedTimeSheet);
        console.log(success);

        success = await instance.addTimeSheet(_clientAddress4, _clientAddress5, encryptedTimeSheet);
        console.log(success);

        success = await instance.addTimeSheet(_clientAddress3, _clientAddress5, encryptedTimeSheet);
        console.log(success);

        var decipher = crypto.createDecipher(algorithm,p);
      
        //let tss = await instance.getSubmittedTimeSheetsByParticipants(_clientAddress3, _clientAddress4);
        /*
        let tss = await instance.getSubmittedTimeSheet(_clientAddress3, _clientAddress4); 
        console.log(tss);
        let dec = decipher.update(tss,'hex','utf8')
        dec += decipher.final('utf8');
        console.log(dec);
        let result = JSON.parse(dec);      
        console.log(result);  
        */   
    });

    it.only('Should add four timesheets with the same mapping then be able to retreive each by block hash', async () => {
        // https://stackoverflow.com/questions/7094615/nodejs-convert-string-to-buffer
        // https://ethereum.stackexchange.com/questions/1587/how-can-i-get-the-data-of-the-latest-10-blocks-via-web3-js
        const algorithm = 'aes-256-ctr';
        let p = 'd6F3Efeq';
        let index = 0;
        let txhashes = [];
        console.log('here')
        // Set up contract
        const instance = await punchTimeSheets.deployed();
        console.log('here')
        //whitelist two participants
        const _clientAddress2 = accounts[2];
        let success = await instance.whiteListClient(_clientAddress2);
        console.log(success)

        let exist = await instance.isWhiteListed(_clientAddress2);
        console.log(exist)

        const _clientAddress3 = accounts[3];
        success = await instance.whiteListClient(_clientAddress3);
        console.log(success)


        while(index < 5)
        {
            let submittedTimeSheet =  {                               
                "contractorid":1,
                "sow":1,
                "t":[
                           {
                               "code":123456,                              
                               "billable":20*index,
                           },{
                               "code":654321,                             
                               "billable":16.0+index,                                                 
                           }                          
                       ]
               }

            const ts = JSON.stringify(submittedTimeSheet);
            // console.log(ts);
            
            var cipher = crypto.createCipher(algorithm,p)
            var encryptedTimeSheet = cipher.update(ts,'utf8','hex')
            encryptedTimeSheet += cipher.final('hex');
    
            tx = await instance.addTimeSheet(_clientAddress2, _clientAddress3, encryptedTimeSheet);                    
            console.log(tx)
            console.log(tx.logs[0])   
            txhashes.push(tx);
            index++;
        }

        // latest?
        var decipher = crypto.createDecipher(algorithm,p);
      
        //let tss = await instance.getSubmittedTimeSheetsByParticipants(_clientAddress3, _clientAddress4);
        /*
        let tss = await instance.getSubmittedTimeSheet(_clientAddress2, _clientAddress3); 
        console.log(tss);
        let dec = decipher.update(tss,'hex','utf8')
        dec += decipher.final('utf8');
        console.log(dec);
        let result = JSON.parse(dec);      
        console.log(result);     
        */
    });

  })