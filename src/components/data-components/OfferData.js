const OfferData = ({ data }) => { 
    const getExperienceText = (experienceLevel) => {
        switch (experienceLevel) {
            case 'D':
                return 'Débutant';
            case 'E':
                return 'Expérimenté';
            case 'S':
                return 'Sénior';
            default:
                return 'Niveau inconnu';
        }
    };
    const experienceText = getExperienceText(data.experienceExige);
    
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC'
    }).format(new Date(data.dateCreation));


    return (
        <div className="offer-data">
            <div className="">
                <h3>Intitulé du poste : </h3>
                <p>{data.intitule}</p>
            </div>
            <div>
                <h3>L’expérience exigée : </h3>
                <p>{experienceText}</p>
            </div>
            <div>
                <h3>Date de création de l’annonce : </h3>
                <p>{formattedDate}</p>
            </div>
            <div>
                <h3>Département : </h3>
                <p>{data.departement}</p>
            </div>
        </div>
    );
};

export default OfferData;