const OfferData = ({ data }) => {    
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
                <p>{data.experienceExige}</p>
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