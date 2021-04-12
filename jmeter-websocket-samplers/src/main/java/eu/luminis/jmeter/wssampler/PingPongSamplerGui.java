/*
 * Copyright 2016, 2017 Peter Doornbosch
 *
 * This file is part of JMeter-WebSocket-Samplers, a JMeter add-on for load-testing WebSocket applications.
 *
 * JMeter-WebSocket-Samplers is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * JMeter-WebSocket-Samplers is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for
 * more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package eu.luminis.jmeter.wssampler;

import org.apache.jmeter.samplers.gui.AbstractSamplerGui;
import org.apache.jmeter.testelement.TestElement;

import javax.swing.BorderFactory;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import java.awt.BorderLayout;
import java.awt.FlowLayout;

public class PingPongSamplerGui extends AbstractSamplerGui {

    private JTextField readTimeoutField;

    public PingPongSamplerGui() {
        init();
    }

    private void init() {
        setLayout(new BorderLayout(0, 5));
        setBorder(makeBorder());
        add(makeTitlePanel(), BorderLayout.NORTH);

        JPanel layoutPanel = new JPanel();
        {
            layoutPanel.setLayout(new BorderLayout());

            JPanel requestSettingsPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
            {
                requestSettingsPanel.setBorder(BorderFactory.createTitledBorder("Data (pong frame)"));
                requestSettingsPanel.add(new JLabel("Pong (read) timeout (ms): "));
                readTimeoutField = new JTextField();
                readTimeoutField.setColumns(5);
                requestSettingsPanel.add(readTimeoutField);
            }
            layoutPanel.add(requestSettingsPanel, BorderLayout.NORTH);
            layoutPanel.add(WebSocketSamplerGuiPanel.createAboutPanel(this));
        }

        add(layoutPanel, BorderLayout.CENTER);
    }

    @Override
    public String getStaticLabel() {
        return "WebSocket Ping/Pong";
    }

    @Override
    public String getLabelResource() {
        return null;
    }

    @Override
    public TestElement createTestElement() {
        PingPongSampler element = new PingPongSampler();
        configureTestElement(element);  // Essential because it sets some basic JMeter properties (e.g. the link between sampler and gui class)
        return element;
    }

    @Override
    public void configure(TestElement element) {
        super.configure(element);
        if (element instanceof PingPongSampler) {
            PingPongSampler sampler = (PingPongSampler) element;
            readTimeoutField.setText(sampler.getReadTimeout());
        }
        super.configure(element);
    }

    @Override
    public void clearGui() {
        super.clearGui();
        readTimeoutField.setText("");
    }

    @Override
    public void modifyTestElement(TestElement testElement) {
        configureTestElement(testElement);
        if (testElement instanceof PingPongSampler) {
            PingPongSampler sampler = (PingPongSampler) testElement;
            sampler.setReadTimeout(readTimeoutField.getText());
        }
    }

}

