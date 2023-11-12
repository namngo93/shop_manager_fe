export default function People(){
    return(
        <>
            <div className="section-title">
                <h2>Members</h2>
            </div>

                <div className='row' style={{textAlign:"center",height:700}}>
                    <div className='col-4'>
                        <div className="image">
                            <img className="default-img"
                                 src='/images/315585105_669767017911984_9181719092457312684_n.jpg' alt="#" style={{width:100, height:100, borderRadius:'50%'}}/>
                        </div>
                        <h5>Ngô Hoàng Nam</h5>

                    </div>
                    <div className='col-4'>
                        <div className="image">
                            <img className="default-img"
                                 src='/images/Trung.jpg' alt="#" style={{width:100, height:100, borderRadius:'50%'}}/>
                        </div>
                        <h5>Cao Văn Trung</h5>
                    </div>
                    <div className='col-4'>
                        <div className="image">
                            <img className="default-img"
                                 src='/images/long.jpg' alt="#" style={{width:100, height:100, borderRadius:'50%'}}/>
                        </div>
                        <h5>Dương Văn long</h5>
                    </div>
                </div>




        </>
    )
}