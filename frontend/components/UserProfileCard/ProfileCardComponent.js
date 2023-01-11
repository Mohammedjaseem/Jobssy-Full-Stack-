

const ProfileCardComponent = () => (
    <div className=''>
      <div className=''>
        <div className=''>
          <div>
            <img src="/frontendmentor/challenge/profile-card-component/image-victor.jpg" />
          </div>
        </div>
        <div className=''>
          <p>Victor Crest <span>26</span></p>
          <p>London</p>
        </div>
        <div className={profile_stats}>
          <div>
            <p>80K</p>
            <p>Followers</p>
          </div>
          <div>
            <p>803K</p>
            <p>Likes</p>
          </div>
          <div>
            <p>1.4K</p>
            <p>Photos</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default ProfileCardComponent;