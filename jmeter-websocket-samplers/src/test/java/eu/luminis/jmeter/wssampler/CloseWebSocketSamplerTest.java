package eu.luminis.jmeter.wssampler;

import eu.luminis.websocket.CloseFrame;
import eu.luminis.websocket.MockWebSocketClientCreator;
import eu.luminis.websocket.WebSocketClient;
import org.apache.jmeter.samplers.SampleResult;
import org.junit.Test;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

public class CloseWebSocketSamplerTest {

    MockWebSocketClientCreator mocker = new MockWebSocketClientCreator();

    @Test
    public void testFrameFilter() {
        CloseWebSocketSampler sampler = new CloseWebSocketSampler() {
            @Override
            protected WebSocketClient prepareWebSocketClient(SampleResult result) {
                return mocker.createMultipleTextFollowedByCloseClient(3);
            }
        };
        TextFrameFilter filter = new TextFrameFilter();
        filter.setComparisonType(ComparisonType.NotStartsWith);
        filter.setMatchValue("response 7");
        sampler.addTestElement(filter);

        SampleResult result = sampler.sample(null);
        assertTrue(result.isSuccessful());
        assertEquals("1001: bye", result.getResponseDataAsString());
        assertEquals(3, result.getSubResults().length);
    }

    @Test
    public void sendingFrameShouldSetResultSentSize() {
        CloseWebSocketSampler sampler = new CloseWebSocketSampler() {
            @Override
            protected WebSocketClient prepareWebSocketClient(SampleResult result) {
                return mocker.createSingleFrameClient(new CloseFrame());
            }
        };

        SampleResult result = sampler.sample(null);
        assertTrue(result.isSuccessful());
        assertEquals(0 + 6 + 2 + 23, result.getSentBytes());  // 0: no http header (because of mock); 6: frame overhead (client mask = 4 byte); 7: payload
    }
}
