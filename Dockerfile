
FROM grafana/grafana:5.0.4

ADD  dist/ /var/lib/grafana/plugins/innius-grafana-plugin
ADD  public/img/ /usr/share/grafana/public/img/
