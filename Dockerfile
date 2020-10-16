FROM ubuntu:18.04
#COPY $pwd/ /Gekidan100/
RUN apt-get -y update \
    && apt-get -y upgrade \
    && apt-get install -y locales curl python3-distutils \
    && curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
    && python3 get-pip.py \
    && pip install -U pip \
    && mkdir /code \
    && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8
WORKDIR /code
ADD requrments.txt /code
RUN pip install -r requrments.txt
#WORKDIR /Gekidan100
WORKDIR /Gekidan100/


#docker run -v $PWD/:/Gekidan100/ --name test -it --rm -p 8000:8000 django