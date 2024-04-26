import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dash from './Dash';

function Faq() {
    const [expanded, setExpanded] = React.useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    };

    return (
        <Dash>
            <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                        <Typography variant="h6">Quels sont les tarifs pour réserver un stand?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Les tarifs de réservation de stand varient en fonction de la taille et de l'emplacement du stand. Contactez-nous pour obtenir des informations détaillées sur les tarifs.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                        <Typography variant="h6">Comment puis-je réserver un stand pour un événement?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Pour réserver un stand pour un événement, veuillez remplir le formulaire de réservation sur notre site web ou contactez notre équipe d'événementiel.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                        <Typography variant="h6">Quelles sont les modalités de paiement?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Les modalités de paiement pour la réservation d'un stand sont disponibles sur demande. Contactez notre service client pour plus d'informations.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                        <Typography variant="h6">Qu'est-ce que la vue 360?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            La vue 360 est une fonctionnalité qui permet aux visiteurs de la foire de visualiser virtuellement les différents stands et les espaces de l'événement depuis n'importe quel angle.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5bh-content" id="panel5bh-header">
                        <Typography variant="h6">Comment puis-je réserver un stand pour la foire?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Pour réserver un stand pour la foire, veuillez remplir le formulaire de réservation sur notre site web ou contactez notre équipe d'événementiel.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel6bh-content" id="panel6bh-header">
                        <Typography variant="h6">Comment puis-je obtenir une invitation pour la foire?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Les invitations pour la foire peuvent être obtenues en remplissant le formulaire de demande d'invitation sur notre site web ou en contactant notre service client.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel7bh-content" id="panel7bh-header">
                        <Typography variant="h6">Quels sont les avantages de participer à la foire?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Participer à la foire vous offre une excellente occasion de rencontrer des clients potentiels, de présenter vos produits ou services, et de renforcer votre réseau professionnel.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Dash>
    );
}

export default Faq;
