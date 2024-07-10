const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: [true, "Organization name is required"]
  },
  organizationFounder: {
    founderName: {
      type: String,
      required: [true, "Founder name is required"]
    },
    mobileNo: {
      type: String,
      required: [true, "Mobile number is required"]
    },
    email: {
      type: String,
      required: [true, "Email is required"]
    }
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  locationOfOrg: {
    type: String,
    required: [true, "Location of organization is required"]
  },
  temporaryOrRegistered: {
    type: String,
    enum: ['Temporary', 'Registered'],
    required: [true, "Please specify if the organization is temporary or registered"]
  },
  temporaryDetails: {
    adhaarNo: {
      type: String,
      required: function() { return this.temporaryOrRegistered === 'Temporary'; }
    },
    adhaarImages:[
        
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
            required: function() { return this.temporaryOrRegistered === 'Temporary'; }
            
        }
        
    ],
    declarationOfHonesty: {
      type: String,
      required: function() { return this.temporaryOrRegistered === 'Temporary'; }
    }
  },
  registeredDetails: {
    organizationRegNo: {
      type: String,
      required: function() { return this.temporaryOrRegistered === 'Registered'; }
    },
    uploadImageOfCertificate:[
        
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
            required: function() { return this.temporaryOrRegistered === 'Registered'; }
            
        }
        
    ],
    describeYourOrganization: {
      type: String,
      required: function() { return this.temporaryOrRegistered === 'Registered'; }
    }
  }
});

module.exports = mongoose.model('Organization', organizationSchema);
