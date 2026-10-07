# The site is served by html-saurus, which builds the HTML at start-up and answers on port 80.
#
# Ubuntu with the GraalVM Community distribution unpacked on top, as every Java image here is
# (DockerfileConvention_260923_oo01). html-saurus is compiled for Java 25, so the Java 21 image
# this used to stand on answered every request with UnsupportedClassVersionError.
FROM ubuntu:24.04

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

ENV GRAALVM_VERSION=25.0.0
RUN curl -fsSL "https://github.com/graalvm/graalvm-ce-builds/releases/download/jdk-${GRAALVM_VERSION}/graalvm-community-jdk-${GRAALVM_VERSION}_linux-x64_bin.tar.gz" \
      -o /tmp/graalvm.tar.gz \
 && mkdir -p /opt/graalvm \
 && tar -xzf /tmp/graalvm.tar.gz -C /opt/graalvm --strip-components=1 \
 && rm /tmp/graalvm.tar.gz
ENV JAVA_HOME=/opt/graalvm
ENV PATH=${JAVA_HOME}/bin:${PATH}
# Without this the locale is POSIX, and the JVM cannot turn a path holding a non-ASCII character
# into a Path.
ENV LANG=C.UTF-8

WORKDIR /app
COPY html-saurus.jar /app/html-saurus.jar
COPY . /data/nigsc_homepage2/
EXPOSE 80
CMD ["java", "-jar", "/app/html-saurus.jar", "/data/nigsc_homepage2", \
     "--production", "--port", "80"]
