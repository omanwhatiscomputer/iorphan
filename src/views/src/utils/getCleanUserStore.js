
const getCleanUserStore = () => {
    const cleanStore = {
        __t: "",
        _id: "",
        dateCreated: "",
        profilePhoto: "",
        sex: "",
        nationality: "",
        dateOfBirth: "",
        address: "",
        currency: "",
        bankAccountNo: "",
        mobileNo: "",
        name: "",
        email: "",
        prefix: "",
        blogposts: [],
    
        // client props
        eligibility: "",
        transactions: [],
        creditCardNumber: "",
        clientId: "",
        isVolunteer: "",
        hasVolunteered: "",
        totalDonated: "",
        volunteeringAt: "",
        blacklisted: "",
        hasAdoptedBefore: "",
        pastOrphans: [],
        inProcessOfAdoption: "",
        currentProceedings: [],
    
        // consultant and manager props
        organization: "",
        isAssigned: "",
    
        // consultant
        proceedings: [],
    
        // admin props
        adminId: "",
      };
    return cleanStore;
}

export default getCleanUserStore;