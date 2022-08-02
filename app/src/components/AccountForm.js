const AccountForm
 = ({
    handleSubmit,
    ifsc,
    setIfsc,
    account,
    setAccount,
    confirmAccount,
    setConfirmAccount,
    name,
    setName,
  }) => (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group mb-3">
        <label className="form-label">IFSC Code</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter IFSC Code"
          value={ifsc}
          onChange={(e) => setIfsc(e.target.value)}
        />
      </div>
  
      <div className="form-group mb-3">
        <label className="form-label">Account Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Account Number"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>
  
      <div className="form-group mb-3">
        <label className="form-label">Confirm Account Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Account Number"
          value={confirmAccount}
          onChange={(e) => setConfirmAccount(e.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Account Holder Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
  
      <button disabled={!ifsc || !account || !confirmAccount || !name} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
  
  export default AccountForm
  ;