
FROM grafana/grafana 

ADD  dist/ /var/lib/grafana/plugins/innius-grafana-plugin
ADD  public/img/ /usr/share/grafana/public/img/