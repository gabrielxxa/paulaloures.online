(function () {

    const isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);

    const BASE_URL = '/wp-json/wp/v2/cnn-sports/v1'

    const SELECTOR = document.querySelector('.cnn_minuto');

    if(!SELECTOR) {
        return;
    }

    const ID_PARTIDA = SELECTOR.dataset.partida;
    const ID_CAMPEONATO = SELECTOR.dataset.campeonato;
    const ID_POST = SELECTOR.dataset.post;
    const ID_MANDANTE = SELECTOR.dataset.mandante;
    const ID_VISITANTE = SELECTOR.dataset.visitante;
    const IMAGE_MANDANTE = SELECTOR.dataset.imagemandante;
    const IMAGE_VISITANTE = SELECTOR.dataset.imagevisitante;

    const objectToUrlParams = (obj) => {
      let params = "";

      for (var key in obj) {
          if (params != "") {
              params += "&";
          }
          params += key + "=" + encodeURIComponent(obj[key]);
      }

      return params;
    };

    const getPartida = (idPartida) => {
        return fetch(`${BASE_URL}/partidas/${idPartida}`).then( async (response) => {
            let resp = {}
            resp = await response.json()

            return resp.data;
        })
        .catch(error => console.log('error ', error))
    }

    const getGols = (idPartida) => {
      return fetch(`${BASE_URL}/partidas/${idPartida}/gols`).then( async (response) => {
          let resp = {}
          resp = await response.json()


          let _jsonParida = await getPartida(idPartida);

          await getUpadateMatch(_jsonParida.placar.golsMandante, _jsonParida.placar.golsVisitante)

          return resp.data;
      })
      .catch(error => console.log('error ', error))
  }

    const getPeriodo = (idPeriodo) => {
        return fetch(`${BASE_URL}/periodosjogo/${idPeriodo}`).then( async (response) => {
            let resp = {}
            resp = await response.json()

            return resp.data;
        })
        .catch(error => console.log('error ', error))
    }

    const getEquipes = (idEquipe) => {
        return fetch(`${BASE_URL}/equipes/${idEquipe}`).then( async (response) => {
            let resp = {}
            resp = await response.json()

            return resp.data;
        })
        .catch(error => console.log('error ', error))
    }

    const getNarracao = async (idPartida, idTempo) => {
        let _URL = `${BASE_URL}/partidas/${idPartida}/narracoes/${idTempo}`

        return fetch(_URL).then( async (response) => {
          let resp = {}
          resp = await response.json()

          return resp.data;
      })
      .catch(error => console.log('error ', error))
    }

    const getEstatistica = (idPartida) => {
        return fetch(`${BASE_URL}/partidas/${idPartida}/equipes/scout`).then( async (response) => {
            let resp = {}
            resp = await response.json()

            return resp.data;
        })
        .catch(error => console.log('error ', error))
    }

    const getJogador = async (idJogador) => {
      return fetch(`${BASE_URL}/jogadores/${idJogador}`).then( async (response) => {
          let resp = {}
          resp = await response.json()

          return resp.data;
      })
      .catch(error => console.log('error ', error))
    }


    const getEscalacao = (idPartida) => {
      return fetch(`${BASE_URL}/partidas/${idPartida}/escalacao`).then( async (response) => {
          let resp = {}
          resp = await response.json()

          return resp.data;
      })
      .catch(error => console.log('error ', error))
    }

    const getClassificacao = (idCampeonato) => {
        return fetch(`${BASE_URL}/campeonatos/${idCampeonato}/classificacao`).then( async (response) => {
            let resp = {}
            resp = await response.json()
            console.log('resp ', resp)
            return resp.data;
        })
        .catch(error => console.log('error ', error))
    }

    const getUpadateMatch = async (golMandante, golsVisitante) => {


      let params = {
          action: CnnSports_js.action,
          nounce: CnnSports_js.nounce,
          matchID: ID_POST,
          golsMandante : golMandante,
          golsVisitante: golsVisitante,
          url: CnnSports_js.CnnSports_ajax
      }

      params = objectToUrlParams(params)

      return fetch(`${CnnSports_js.url}?` + params).then( async (response) => {
          let resp = {}
          resp = await response.json()
          return resp.data;
      })
      .catch(error => console.log('error ', error))
    }

    const handleClickMenu = () => {
      const _query = document.querySelectorAll('.cnn_minuto__menu-item');
      const _sections = document.querySelectorAll('.cnn_minuto__section');

      _query.forEach((item) => {
        item.addEventListener('click', e => {
          e.preventDefault();

          for(let x = 0; x < _query.length; x++) {
            _query[x].classList.remove('ativo');
          }

          for(let i = 0; i < _sections.length; i++) {
            _sections[i].classList.remove('ativo');
          }

          const itemId = item.dataset.id;

          document.querySelector(`.cnn_minuto__menu-item[data-id=${itemId}]`).classList.add('ativo');
          document.querySelector(`.cnn_minuto__section[data-section=${itemId}]`).classList.add('ativo');

          window.scrollTo({ top: document.querySelector(`.cnn_minuto__section[data-section=${itemId}]`).getBoundingClientRect().top - 100, behavior: 'smooth'});

          if(itemId === 'aovivo') {
            renderDestaque(ID_PARTIDA)
            renderNaracao(ID_PARTIDA)
          } else if (itemId === 'escalacao') {
            renderEscalacao(ID_PARTIDA)
          } else if (itemId === 'estatisticas') {
            renderEstatistica(ID_PARTIDA)
          } else if (itemId === 'classificacao') {
            renderClassificacao(ID_CAMPEONATO)
          }

          document.location.hash = itemId;

        })
      })
    }

    const handleLances = () => {
      document.querySelector('.cnn_minuto__button--lance').addEventListener('click', async e => {

        const currentSection = document.querySelector('.cnn_minuto__section.ativo');
        const aovivoSection = document.querySelector('.cnn_minuto__section[data-section=aovivo]');
        const currentMenuItem = document.querySelector('.cnn_minuto__menu-item[data-id="' + currentSection.dataset.section + '"]');
        const aovivoMenuItem = document.querySelector('.cnn_minuto__menu-item[data-id=aovivo]');

        if (currentSection.dataset.section !== 'aovivo') {
          currentSection.classList.remove('ativo');
          aovivoSection.classList.add('ativo');
          currentMenuItem.classList.remove('ativo');
          aovivoMenuItem.classList.add('ativo');
        }

        e.target.classList.toggle('ativo');
        if(e.target.classList.contains('ativo')) {
          e.target.innerHTML = 'Ver todos os lances'
        } else {
          e.target.innerHTML = 'Ver lances importantes'
        }
        await renderNaracao(ID_PARTIDA)

        // scroll lances importantes
        const buttonPosition = e.target.getBoundingClientRect().top + window.scrollY + 80;

        window.scrollTo({
          top: buttonPosition,
          behavior: 'smooth'
        });
      })
    }


    const handleCampo = () => {
      document.querySelector('.cnn_minuto__button--campo')?.addEventListener('click', async e => {
        document.querySelector('#cnn_minuto__campo').classList.toggle('ativo');
        if(document.querySelector('#cnn_minuto__campo').classList.contains('ativo')) {
          e.target.innerHTML = 'Abrir Campinho'
        } else {
          e.target.innerHTML = 'Fechar Campinho'
        }
      })
    }


    const renderPorcentagePosse = (posse, posseAdversario) => {
      const _storage = JSON.parse(localStorage.getItem('narracao'));
      const _posse = posse / 60;
      const _posseAdversario = posseAdversario / 60;
      const _tempo = 90;

      let _total, _totalAdversario;

      if (_storage.data[0]?.acaoImportante === 'Fim de jogo') {
        const _primeiroTempo = _storage.data.filter(acao => acao.acaoImportante === 'Intervalo')[0].tempoDeJogoEmMinutos;
        const _segundoTempo = _storage.data.filter(acao => acao.acaoImportante === 'Fim de jogo')[0].tempoDeJogoEmMinutos;

        _total = (_posse * _tempo) / 100;
        _totalAdversario = (_posseAdversario * _tempo) / 100;
      } else {
        _total = (_posse * 100) / _tempo;
        _totalAdversario = (_posseAdversario * 100) / _tempo;
      }

      return (_total * 100) / (_total + _totalAdversario);

    }

    const renderPorcentageMandante = (mandante, visitante) => {
      let _total = mandante + visitante;

      if(mandante === 0) return 0 + '%';

      return (mandante * 100) / _total + '%';

    }

    const renderPorcentageVisitante = (mandante, visitante) => {
      let _total = mandante + visitante;

      if(visitante === 0) return 0 + '%';

      return (visitante * 100) / _total + '%';

    }

    const renderActions = (action) => {
        switch (action) {
            case 'Cartão amarelo':
                return 'cnn_minuto__action--cartaoAmarelo'
            case 'Cartão vermelho':
                return 'cnn_minuto__action--cartaoVermelho'
            case 'Gol':
                return 'cnn_minuto__action--gol'
            case 'Substituição':
                return 'cnn_minuto__action--substituicao'
            case 'Impedimento':
                return 'cnn_minuto__action--impedimento'
            case 'Pênalti':
                return 'cnn_minuto__action--penalti'
            default:
                return ''
            break;
        }
    }

    const renderDestaque = async (id) => {
        let _jsonParida = await getPartida(id);
        let _jsonPeriodo = await getPeriodo(_jsonParida.idPeriodoJogo);
        let _placar = '';
        let _status = '';
        let __decisaoPenaltis = (
          _jsonParida.placar.decisaoPenaltisCertoMandante !== 0 ||
          _jsonParida.placar.decisaoPenaltisCertoVisitante !== 0 ||
          _jsonParida.placar.decisaoPenaltisErradoMandante !== 0 ||
          _jsonParida.placar.decisaoPenaltisErradoVisitante !== 0
        )

        if(_jsonPeriodo.id === 10 || _jsonPeriodo.id === 11) {
          document.querySelector('.cnn_minuto__menu-item--aovivo').innerHTML = 'Lances'
        } else {
          document.querySelector('.cnn_minuto__menu-item--aovivo').innerHTML = '<span class="blob white"></span>Ao vivo'
        }

        _placar += (_jsonParida.placar.golsMandante === null && _jsonParida.placar.golsVisitante === null)
          ? `<span> - X - </span>`
          : `<span>${_jsonParida.placar.golsMandante} ${__decisaoPenaltis ? '(' + _jsonParida.placar.decisaoPenaltisCertoMandante + ')' : ''} X ${__decisaoPenaltis ? '(' + _jsonParida.placar.decisaoPenaltisCertoVisitante + ')' : ''} ${_jsonParida.placar.golsVisitante}</span>`

        _status += `<span>${_jsonPeriodo.periodoDoJogo}</span>`


        document.querySelector('.cnn_minuto__placar-value').innerHTML = _placar;
        document.querySelector('.cnn_minuto__status').innerHTML = _status;
    }

    const renderNaracao = async (idPartida) => {
        let _json;
        let _html = '';
        let _arr = [];
        const oldJson = JSON.parse(localStorage.getItem('narracao'));
        const lancesImportantes = document.querySelector('.cnn_minuto__button--lance').classList.contains('ativo');

        if(oldJson?.id === ID_PARTIDA) {
          _json = await getNarracao(idPartida, oldJson.data.length > 0 ? oldJson.data[0]?.id : 0);
          _json.pop();
          _arr = {id: ID_PARTIDA, data: [..._json, ...oldJson.data]}

          if(_json.acaoImportante === 'Gol') {
            await getGols(ID_PARTIDA)
          }

        } else {
          _json = await getNarracao(idPartida, 0);
          _arr = {id: ID_PARTIDA, data: _json}
        }

        localStorage.setItem('narracao', JSON.stringify(_arr))

        if(lancesImportantes) {

          _arr.data.forEach((item, key) => {
            if(item.acaoImportante !== '') {
                _html += `
                    <div class="cnn_minuto__box ${item.acaoImportante.length > 0 ? 'cnn_minuto__box--importante' : ''}" key="${key}">
                        <div class="cnn_minuto__box-header">
                          <span>
                            ${item.tempoDeJogoEmMinutos}' - ${item.periodoJogo}
                            <span class="cnn_minuto__action ${renderActions(item.acaoImportante)}"> ${item.acaoImportante === 'Gol' ? 'GOOOLLLLL' : item.acaoImportante} </span>
                            ${item.acaoImportante === 'Gol' || item.acaoImportante === 'Substituição' ? '<span class="cnn_minuto__action--icon"></span>' : ''}
                          </span>
                        </div>
                        <div class="cnn_minuto__box-body">
                            <span>${item.narracao}</span>
                        </div>
                        <div class="cnn_minuto__box-footer">
                          ${item.equipe ? `<img src="${item.idEquipe === parseInt(ID_MANDANTE) ? IMAGE_MANDANTE : IMAGE_VISITANTE}" />` : ''}
                          <span>${item.equipe ? item.equipe : ''}</span>
                        </div>
                    </div>
                `
            }
          })
        } else {
          _arr.data.forEach((item, key) => {
              _html += `
                  <div class="cnn_minuto__box ${item.acaoImportante.length > 0 ? 'cnn_minuto__box--importante' : ''}" key="${key}">
                      <div class="cnn_minuto__box-header">
                        <span>
                          ${item.tempoDeJogoEmMinutos}' - ${item.periodoJogo === 'Pen' ? '' : item.periodoJogo }
                          <span class="cnn_minuto__action ${renderActions(item.acaoImportante)}"> ${item.acaoImportante === 'Gol' ? 'GOOOLLLLL' : item.acaoImportante} </span>
                          <span class="cnn_minuto__action--icon"></span>
                        </span>
                      </div>
                      <div class="cnn_minuto__box-body">
                          <span>${item.narracao}</span>
                      </div>
                      <div class="cnn_minuto__box-footer">
                        ${item.equipe ? `<img src="${item.idEquipe === parseInt(ID_MANDANTE) ? IMAGE_MANDANTE : IMAGE_VISITANTE}" />` : ''}
                        <span>${item.equipe ? item.equipe : ''}</span>
                      </div>
                  </div>
              `
          })
        }

        if (_arr.data.length === 0) {
          _html = '<span class="placeholder_message">Lances indisponíveis para esta partida.</span>';
        }

        document.querySelector('#cnn_minuto__narracao').innerHTML = _html;
    }

    const renderClassificacao = async (id) => {
        const _query = document.querySelector('#cnn_minuto__times');
        if(id === '850') {
          _query.classList.add('brasileirao')
        }
    }

    const renderEstatistica = async (id) => {
        let _json = await getEstatistica(id)
        let _html = '';
        let posseMandante = _json.equipeMandante[0]?.posseDeBola;
        let posseVisitante = _json.equipeVisitante[0]?.posseDeBola;
        const _query = document.querySelector('#cnn_minuto__estatistica');
        const container = _query.closest('.cnn_minuto__container');
        const estatisticasItems = document.querySelectorAll('.cnn_minuto__estatistica-item');

        if (estatisticasItems.length > 1) {
          for (let i = 1; i < estatisticasItems.length; i++) {
            const item = estatisticasItems[i];
            item.parentNode.removeChild(item);
          }
        }

        if (_json.equipeMandante.length === 0 && _json.equipeVisitante.length === 0) {
          _html = '<span class="placeholder_message">Estatísticas indisponíveis para esta partida.</span>';
          container.querySelector('.cnn_minuto__loading').remove();
          container.insertAdjacentHTML('afterbegin', _html);
        } else {


          _html += `
            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Finalizações</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].finalizacaoCerta + _json.equipeMandante[0].finalizacaoErrada}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante((_json.equipeMandante[0].finalizacaoCerta + _json.equipeMandante[0].finalizacaoErrada), (_json.equipeVisitante[0].finalizacaoCerta + _json.equipeVisitante[0].finalizacaoErrada))}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Finalizações</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante((_json.equipeMandante[0].finalizacaoCerta + _json.equipeMandante[0].finalizacaoErrada), (_json.equipeVisitante[0].finalizacaoCerta + _json.equipeVisitante[0].finalizacaoErrada))}"></div></div>
                    <span>${_json.equipeVisitante[0].finalizacaoCerta + _json.equipeVisitante[0].finalizacaoErrada}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
              ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Chutes a Gol</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].finalizacaoCerta}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].finalizacaoCerta, _json.equipeVisitante[0].finalizacaoCerta)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Chutes a Gol</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].finalizacaoCerta, _json.equipeVisitante[0].finalizacaoCerta)}"></div></div>
                    <span>${_json.equipeVisitante[0].finalizacaoCerta}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Chutes a Fora</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].finalizacaoErrada}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].finalizacaoErrada, _json.equipeVisitante[0].finalizacaoErrada)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Chutes Fora</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].finalizacaoErrada, _json.equipeVisitante[0].finalizacaoErrada)}"></div></div>
                    <span>${_json.equipeVisitante[0].finalizacaoErrada}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Posse de Bola</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${parseInt(Math.round(renderPorcentagePosse(posseMandante, posseVisitante)))}%</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${parseInt(Math.round(renderPorcentagePosse(posseMandante, posseVisitante)))}%"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Posse de Bola</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${parseInt(Math.round(renderPorcentagePosse(posseVisitante, posseMandante)))}%"></div></div>
                    <span>${parseInt(Math.round(renderPorcentagePosse(posseVisitante, posseMandante)))}%</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Passes Corretos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].passeCerto}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].passeCerto, _json.equipeVisitante[0].passeCerto)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Passes Corretos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].passeCerto, _json.equipeVisitante[0].passeCerto)}"></div></div>
                    <span>${_json.equipeVisitante[0].passeCerto}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Passes Incorretos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].passeErrado}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].passeErrado, _json.equipeVisitante[0].passeErrado)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Passes Incorretos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].passeErrado, _json.equipeVisitante[0].passeErrado)}"></div></div>
                    <span>${_json.equipeVisitante[0].passeErrado}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Faltas Cometidas</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].faltaRecebida}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].faltaRecebida, _json.equipeVisitante[0].faltaRecebida)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Faltas Cometidas</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].faltaRecebida, _json.equipeVisitante[0].faltaRecebida)}"></div></div>
                    <span>${_json.equipeVisitante[0].faltaRecebida}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Escanteios</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].escanteioPro}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].escanteioPro, _json.equipeVisitante[0].escanteioPro)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Escanteios</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].escanteioPro, _json.equipeVisitante[0].escanteioPro)}"></div></div>
                    <span>${_json.equipeVisitante[0].escanteioPro}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Impedimentos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].impedimento}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].impedimento, _json.equipeVisitante[0].impedimento)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Impedimentos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].impedimento, _json.equipeVisitante[0].impedimento)}"></div></div>
                    <span>${_json.equipeVisitante[0].impedimento}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Desarmes</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].desarmeCerto}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].desarmeCerto, _json.equipeVisitante[0].desarmeCerto)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Desarmes</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].desarmeCerto, _json.equipeVisitante[0].desarmeCerto)}"></div></div>
                    <span>${_json.equipeVisitante[0].desarmeCerto}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Cartões Amarelos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].cartaoAmarelo}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].cartaoAmarelo, _json.equipeVisitante[0].cartaoAmarelo)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Cartões Amarelos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].cartaoAmarelo, _json.equipeVisitante[0].cartaoAmarelo)}"></div></div>
                    <span>${_json.equipeVisitante[0].cartaoAmarelo}</span>
                </div>
            </div>

            <div class="cnn_minuto__estatistica-item">
                ${isMobile ? '<div class="cnn_minuto__estatistica-scout">Cartões Vermelhos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-mandante">
                    <span>${_json.equipeMandante[0].cartaoVermelho}</span>
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageMandante(_json.equipeMandante[0].cartaoVermelho, _json.equipeVisitante[0].cartaoVermelho)}"></div></div>
                </div>
                ${!isMobile ? '<div class="cnn_minuto__estatistica-scout">Cartões Vermelhos</div>' : ''}
                <div class="cnn_minuto__estatisticas cnn_minuto__estatistica-visitante">
                    <div class="cnn_minuto__progressbar"><div class="cnn_minuto__progressbar--porcentage" style="width: ${renderPorcentageVisitante(_json.equipeMandante[0].cartaoVermelho, _json.equipeVisitante[0].cartaoVermelho)}"></div></div>
                    <span>${_json.equipeVisitante[0].cartaoVermelho}</span>
                </div>
            </div>
          `;

          _query.insertAdjacentHTML('beforeend', _html);
          container.querySelector('.cnn_minuto__loading').remove();
        }

    }

    const renderEscalacao = async (id) => {
      let _json = await getEscalacao(id)
      let _partida = await getPartida(id)
      let _jogador;
      let _equipeMandante = '';
      let _equipeVisitante = '';
      let _reservaMandante = '';
      let _reservaVisitante = '';
      let _arr = [];
      const inputData = document.querySelector('#escalacao_data') || false;
      const _escalacaoWp = inputData ? JSON.parse(inputData.value) : false;
      const equipes = [_json.equipeMandante, _json.equipeVisitante];

      for (const equipe of equipes) {
        const equipeTitular = equipe
          .filter(item => item.titular === true)
          .sort((a, b) => a.idPosicao - b.idPosicao);


        // move os jogadores que entraram para o array de titulares
        for (let i = 0; i < equipeTitular.length; i++) {
          const jogador = equipeTitular[i];
          if (jogador.idJogadorSubstituto !== null) {
            const substituto = equipe.find(item => item.idJogador === jogador.idJogadorSubstituto);
            if (substituto) {
              equipeTitular.splice(i + 1, 0, substituto);
            }
          }
        }

        const equipeReserva = equipe
          .filter(item => !equipeTitular.includes(item));

        const classeEscalacao = equipe === _json.equipeMandante ? 'mandante' : 'visitante';

        for (const item of equipeTitular) {
          const { idJogador, numeroDaCamisa } = item;
          _jogador = (_escalacaoWp)
            ? _escalacaoWp[classeEscalacao].filter(item => item.id === idJogador)[0]
            : await getJogador(idJogador);
          const jogadorHtml = `
            <div class="cnn_minuto__escalacoes cnn_minuto__escalacao-${classeEscalacao} ${item.substituto ? 'substituto': ''} ${item.foiSubstituido ? 'substituido': ''}">
              <span class="cnn_minuto__escalacao-jogador">${numeroDaCamisa}. ${_jogador.apelido}</span>
            </div>
          `;
          // console.log(item);

          if (classeEscalacao === 'mandante') {
            _equipeMandante += jogadorHtml;
          } else {
            _equipeVisitante += jogadorHtml;
          }
        }

        for (const item of equipeReserva) {
          const { idJogador, numeroDaCamisa } = item;
          _jogador = (_escalacaoWp)
            ? _escalacaoWp[classeEscalacao].filter(item => item.id === idJogador)[0]
            : await getJogador(idJogador);
          const jogadorHtml = `
            <div class="cnn_minuto__escalacoes cnn_minuto__escalacao-${classeEscalacao}">
              <span class="cnn_minuto__escalacao-jogador">${numeroDaCamisa}. ${_jogador.apelido}</span>
            </div>
          `;

          if (classeEscalacao === 'mandante') {
            _reservaMandante += jogadorHtml;
          } else {
            _reservaVisitante += jogadorHtml;
          }
        }
      }

      document.querySelector('#cnn_minuto__mandante').innerHTML = _equipeMandante;
      document.querySelector('#cnn_minuto__visitante').innerHTML = _equipeVisitante;
      document.querySelector('#cnn_minuto__mandante-reserva').innerHTML = _reservaMandante;
      document.querySelector('#cnn_minuto__visitante-reserva').innerHTML = _reservaVisitante;


      const container = document.querySelector('.cnn_minuto__escalacao .cnn_minuto__container');
      const placeholder = '<span class="placeholder_message">Escalação indisponível para esta partida.</span>';

      if (_json.equipeMandante.length === 0 || _json.equipeVisitante.length === 0) {
        container.textContent='';
        container.insertAdjacentHTML("afterbegin", placeholder);
      } else {
        container.querySelector('.cnn_minuto__loading').remove();
      }

    }

    const renderGols = async () => {
        let = _golsMandante = '';
        let = _golsVisitante = '';
        let _jogador;

        const golsHtml = document.querySelector('.cnn_minuto__gols');
        const _json = await getGols(ID_PARTIDA);
        const golsMandante = _json.equipeMandante;
        const golsVisitante = _json.equipeVisitante;
        const golsMandanteContra = golsMandante.filter(gol => gol.golContra);
        const golsVisitanteContra = golsVisitante.filter(gol => gol.golContra);

        const golsMandanteTotal = golsMandante.filter(gol => !gol.golContra)
          .concat(golsVisitanteContra)
          .sort((a, b) => {
            if (a.idPeriodoJogo !== b.idPeriodoJogo) {
              return a.idPeriodoJogo - b.idPeriodoJogo;
            } else {
              return a.tempoDeJogoEmMinutos - b.tempoDeJogoEmMinutos;
            }
          });

        const golsVisitanteTotal = golsVisitante.filter(gol => !gol.golContra)
          .concat(golsMandanteContra)
          .sort((a, b) => {
            if (a.idPeriodoJogo !== b.idPeriodoJogo) {
              return a.idPeriodoJogo - b.idPeriodoJogo;
            } else {
              return a.tempoDeJogoEmMinutos - b.tempoDeJogoEmMinutos;
            }
          });


        // list of goals
        if(golsMandanteTotal.length > 0) {
          for(const item of golsMandanteTotal) {
            _jogador = await getJogador(item.idJogador)
            if (!item.varDecisaoExclusao) {
              _golsMandante += `
                <div class="cnn_minuto__gol--item">${_jogador.apelido}, ${item.tempoDeJogoEmMinutos}', ${item.idPeriodoJogo/2}T. ${item.golContra ? ' (GC)': ''}</div>
              `
            }
          }
        }

        if(golsVisitanteTotal.length > 0) {
          for(const item of golsVisitanteTotal) {
            _jogador = await getJogador(item.idJogador)
            if (!item.varDecisaoExclusao) {
              _golsVisitante += `
                <div class="cnn_minuto__gol--item">${_jogador.apelido}, ${item.tempoDeJogoEmMinutos}', ${item.idPeriodoJogo/2}T. ${item.golContra ? ' (GC)': ''}</div>
              `
            }
          }
        }

      document.querySelector('.cnn_minuto__gol--mandante').innerHTML = _golsMandante;
      document.querySelector('.cnn_minuto__gol--visitante').innerHTML = _golsVisitante;

      // goal viewer
      let hasValidGoal = false;

      for (const gol of golsMandante) {
        if (gol.varDecisaoInclusao !== true) {
          hasValidGoal = true;
          break;
        }
      }

      if (!hasValidGoal) {
        for (const gol of golsVisitante) {
          if (gol.varDecisaoInclusao !== true) {
            hasValidGoal = true;
            break;
          }
        }
      }

      if (hasValidGoal && golsHtml.classList.contains('cnn_minuto__gols--hide')) {
        golsHtml.classList.remove('cnn_minuto__gols--hide');
      }
    }

    const renderSportRadar = () => {
        SIR('addWidget', '#cnn_minuto__campo', 'match.matchList', {sportId: 1, onItemClick: function(type, obj){alert('matchId: ' + obj.matchId);}});
    }

    const init = () => {
        localStorage.removeItem("narracao");
        renderDestaque(ID_PARTIDA);
        handleCampo();
        handleLances();
        handleClickMenu();
        renderGols();
        renderNaracao(ID_PARTIDA);
    }

    setInterval(() => {
      renderDestaque(ID_PARTIDA);
      renderNaracao(ID_PARTIDA);

    }, 60000)

    init()

})();


document.addEventListener("DOMContentLoaded", () => {

  // groups nav
  const groups = document.querySelectorAll('.cnn_minuto__table_group');
  let currentGroupIndex = 0;

  if (groups.length > 0) {
    const buttonsPrev = document.querySelectorAll('.cnn_minuto__nav_button--prev');
    const buttonsNext = document.querySelectorAll('.cnn_minuto__nav_button--next');

    buttonsPrev.forEach(button => {
      button.addEventListener('click', showPreviousGroup);
    });

    buttonsNext.forEach(button => {
      button.addEventListener('click', showNextGroup);
    });

    function showPreviousGroup() {
      groups[currentGroupIndex].classList.add('hide');

      currentGroupIndex--;

      if (currentGroupIndex === -1) currentGroupIndex = groups.length - 1;

      groups[currentGroupIndex].classList.remove('hide');
    }

    function showNextGroup() {
      groups[currentGroupIndex].classList.add('hide');

      currentGroupIndex++;

      if (currentGroupIndex === groups.length) currentGroupIndex = 0;

      groups[currentGroupIndex].classList.remove('hide');
    }
  }

  // click hash menu
  const handleHash = () => {
    const hashSubstring = document.location.hash.substring(1) ?? '';

    if (hashSubstring !== '') {
        const menuHash = document.querySelector(`.cnn_minuto__menu-item[data-id=${hashSubstring}]`);

        if (menuHash) {
          setTimeout(() => {
            menuHash.click();
          }, 500);
        }
    }
  }

  handleHash();

});
