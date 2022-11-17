export default function ConfirmationDialog({id, cancel, confirm}) {
    return (
        <>
            <div className="confirmation-overlay"></div>                  
            
            <div className="confirmation-dialog">
                <h2>Are you sure you want to delete this entry?</h2>
                <h3 color="red">This action cannot be undone.</h3>
                <div className="cancel" onClick={() => cancel(false)}>Cancel</div>
                <div className="confirm" onClick={() => confirm(id)}>Confirm</div>
            </div>     
        </> 
    )
}