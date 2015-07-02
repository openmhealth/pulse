# Pulse 

In collaboration with Open mHealth, Catalyze is sharing its Mirth Connect channels and corresponding documentation on mapping HL7 messages to Open mHealth schemas. This repo contains the following:

- Mirth Channels: A fully plug-and-play set of channels to write, ingest and convert HL7 to OmH schemas and vice versa
- Open mHealth Schema mappings: Written in Javascript in a format which serializes HL7 like Mirth Connect does as arrays. Should be broadly applicable for other formats and can be extended via the repo
- Example HL7 and Open mHealth data for parsing in Mirth Connect

##Install instructions##

1) Install Open Source Mirth Connect. [I've written up a separate gist that will help you download and install Mirth Connect for Linux](https://gist.github.com/molsches/322bce27f21b65768f12).

2) [Install the Open mHealth DSU](https://github.com/openmhealth/omh-dsu-ri). If you want to deploy this on HIPAA-compliant infrastructure right away, we've made contributions so that this can be easily bootstrapped onto the Catalyze [Platform as a Service](https://catalyze.io/paas).

3) Once Mirth is up and running, you can import the channels and point them towards your own DSU for quick integration. Current the Mirth channels are mapped using SNOMED/LOINC codes. If you are not receiving or are unable to write values back into the EHR using those values, you will need to do your own mappings on OBX 3.1 -3.3. 

##Future Roadmap##

In the future, we'd like to provide similar support for data for: 

- CCDAs
- FHIR
- EHR-specific identifier bindings
- Patient-portal specific upload bindings (Cerner Health APIs, Epic Sense, etc.)

##Enhancements?##

We'd love to see how you're using this in the real world. Submit a pull request with any update, enhancements, or any contributions that you have to this product.


##Questions?##

Please submit an issue. We'll be sure to attempt to answer your questions right away.

##License##

Apache Version 2.0
